import path from "path";
import "dotenv/config";
import pc from "picocolors";
import { Octokit } from "octokit";
import { _spinner } from "./spinners.js";
import { OWNER, REPO } from "./constants.js";
import fileSystem, { promises as fs } from "fs";
import { BLUE, RED, YELLOW } from "./constants.js";
import { overrideComponentPrompter } from "./index.js";
import { Project, SourceFile, StringLiteral } from "ts-morph";
import { RNPAConfig } from "../../rnpa.config.js";

const spinner = _spinner();

const octokit = new Octokit({ auth: process.env.AUTH_TOKEN });

const project = new Project();

export const ensureString = (str: string | undefined | null) => str || "";

export const hexToAnsi256 = (sHex: string): number => {
  const rgb = parseInt(sHex.slice(1), 16);
  const r = Math.floor(rgb / (256 * 256)) % 256;
  const g = Math.floor(rgb / 256) % 256;
  const b = rgb % 256;

  const ansi = 16
    + 36 * Math.round((r / 255) * 5)
    + 6 * Math.round((g / 255) * 5)
    + Math.round((b / 255) * 5);
  return ansi;
};

export const hex = (color: string): (text: string) => string => {
  const ansiColor = hexToAnsi256(color);
  return (text: string) => `\x1b[38;5;${ansiColor}m${text}${pc.reset("")}`;
};

export const turboRed = hex(RED);
export const turboBlue = hex(BLUE);
export const turboYellow = hex(YELLOW);

export const isDir = (dir: string | Buffer<ArrayBufferLike>) => {
  return fileSystem.lstatSync(dir).isDirectory();
};

export const isFile = (dir: string) => {
  return fileSystem.lstatSync(dir).isFile();
};

export const getModuleSpecifier = (sourceFile: SourceFile | undefined) => {
  const imports = sourceFile?.getImportDeclarations() || [];
  return imports.map((i) => i.getModuleSpecifier());
};

const updateImport = (
  {
    alias,
    filePath,
    relativeOutDir,
    moduleSpecifiers,
  }: {
    alias?: string;
    filePath?: string;
    relativeOutDir?: string;
    moduleSpecifiers: StringLiteral[];
  },
) => {
  for (let s of moduleSpecifiers) {
    // Access the components folder correctly
    // Specifically used for the core folder
    const literal = s.getLiteralValue();

    if (alias) {
      // This is used for other components
      // if path is ../../foo/bar change it to @/alias/foo/bar
      if (literal.includes("..")) {
        const newImport = alias + literal.split("..").pop();
        s.setLiteralValue(newImport);
      }

      if (relativeOutDir && literal.startsWith("../")) {
        // Check if the current import is declaration has over traversed
        // beyond outside the specified outdir
        // if relative outdir is foo/bar/baz and the current import
        // from file foo/bar/baz/comp/index.tsx is ../../foobar
        // Resolving the dir produces foo/foobar
        // This is considered to be outside.
        // The import should be ../foobar and resolve to
        // foo/bar/baz/foobar
        const handleTraversePath = (currentImport: string) => {
          const folderPath = ensureString(filePath?.split("/").slice(0, -1).join("/"));
          const fullPath = path.resolve(folderPath, currentImport);
          if (!fullPath.includes(relativeOutDir) && currentImport.includes("../")) {
            const traversedPath = currentImport.split(/^..\//).join("");
            // Recusrsively traverse back
            handleTraversePath(traversedPath);
          } else {
            const resolvedPath = path.resolve(folderPath, currentImport);
            const newImport = alias + resolvedPath.split(relativeOutDir).slice(1).join("");
            s.setLiteralValue(newImport);
          }
        };
        handleTraversePath(literal);
      }

      // If component in Foo/index.tsx prepend imports with alias to
      // access out components correctly
      if (filePath?.includes("index.tsx") && literal.startsWith("./")) {
        const newImport = alias + "/" + ensureString(literal.split("./").pop());
        s.setLiteralValue(newImport);
      }
    } else {
      // Check if the current import is declaration has over traversed
      // beyond outside the specified outdir
      // if relative outdir is foo/bar/baz and the current import
      // from file foo/bar/baz/comp/index.tsx is ../../foobar
      // Resolving the dir produces foo/foobar
      // This is considered to be outside.
      // The import should be ../foobar and resolve to
      // foo/bar/baz/foobar
      if (literal.includes("../..") && relativeOutDir) {
        const handleTraversePath = (currentImport: string) => {
          const folderPath = ensureString(filePath?.split("/").slice(0, -1).join("/"));
          const fullPath = path.resolve(folderPath, currentImport);
          if (!fullPath.includes(relativeOutDir) && currentImport.includes("../")) {
            const traversedPath = currentImport.split(/^..\//).join("");
            // Recusrsively traverse back
            handleTraversePath(traversedPath);
          } else {
            s.setLiteralValue(currentImport);
          }
        };
        handleTraversePath(literal);
      }
      if (literal.includes("components/")) {
        const newImport = literal.split("components/").join("");
        s.setLiteralValue(newImport);
      }
    }
  }
};

export const processDirectory = async (componentsDir: string[], relativeOutDir?: string): Promise<void> => {
  for (let compDir of componentsDir) {
    try {
      // If current is a directory
      if (fileSystem.lstatSync(compDir).isDirectory()) {
        const dirs = fileSystem.readdirSync(compDir);
        for (let dir of dirs) {
          const compPath = path.join(compDir, dir);

          if (fileSystem.lstatSync(compPath).isFile()) {
            project.addSourceFileAtPath(compPath);
            const sourceFile = project.getSourceFile(compPath);
            // Get import statements
            const moduleSpecifiers = getModuleSpecifier(sourceFile);
            updateImport({ moduleSpecifiers, filePath: compPath, relativeOutDir });
            await sourceFile?.save();
          }
        }
      } else {
        // Get import statements
        const sourceFile = project.getSourceFile(compDir);
        const moduleSpecifiers = getModuleSpecifier(sourceFile);
        updateImport({ moduleSpecifiers, filePath: compDir, relativeOutDir });
        await sourceFile?.save();
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export const handleCreateConfigFile = (configPath: string, config: RNPAConfig) => {
  const dataString = JSON.stringify(config, null, 2);
  try {
    fileSystem.writeFileSync(configPath, dataString, "utf8");
  } catch (err) {
    console.log(err);
  }
};

const COMPONENTS_PATH = "src/components";

const handleCreateFile = async (
  decodedContent: string,
  filePath: string,
) => {
  const uint8ArrayContent = new Uint8Array(decodedContent.length);
  for (let i = 0; i < decodedContent.length; i++) {
    uint8ArrayContent[i] = decodedContent.charCodeAt(i);
  }
  await fs.writeFile(filePath, uint8ArrayContent);
};

const handleCreateFilePath = (basePath: string, relativePath: string) => {
  const contentPath = relativePath.split(COMPONENTS_PATH).pop() || "";
  return path.join(basePath, contentPath);
};

const checkRateLimit = async () => {
  const result = await octokit.request("GET /rate_limit", {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  console.log(result);
};

const handleGetContent = async (componentName: string) => {
  try {
    const result = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
      owner: OWNER,
      repo: REPO,
      path: componentName,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    return result;
  } catch ({ message }: any) {
    if (message.includes("Not Found")) {
      console.log(pc.red(`component with name ${pc.blue(pc.bold(path.basename(componentName)))} not found..`));
    } else {
      console.log(pc.red(message));
    }
    process.exit();
  }
};

export const handleSaveToFolder = async (
  outDir: string,
  componentName: string,
  importAlias: string,
  progressCallback: (progress: number) => void,
) => {
  let processedCount = 0;
  let totalCount = 0;

  // await checkRateLimit();
  // return;

  const recurse = async (componentPath: string) => {
    const result = await handleGetContent(componentPath);
    const fileContent = result?.data;

    if (fileContent) {
      if (Array.isArray(fileContent)) {
        totalCount += fileContent.length;
        await Promise.all(
          fileContent.map(async (data: any) => {
            if (data.type === "dir") {
              const dirPath = path.join(process.cwd(), handleCreateFilePath(outDir, data.path));
              await fs.mkdir(dirPath, { recursive: true });
              await recurse(data.path);
            } else {
              await recurse(data.path);
            }
          }),
        );
      } else {
        processedCount++;
        const filePath = path.join(process.cwd(), handleCreateFilePath(outDir, fileContent?.path));
        const pathSplit = fileContent.path.split("/");
        const folderPath = pathSplit.slice(0, pathSplit.length - 1).join("/");
        const compOutDir = path.join(process.cwd(), handleCreateFilePath(outDir, folderPath));

        await fs.mkdir(compOutDir, { recursive: true });
        const decodedContent = atob((fileContent as any).content);
        await handleCreateFile(decodedContent, filePath);

        // Get import statements
        project.addSourceFileAtPath(filePath);
        const sourceFile = project.getSourceFile(filePath);
        const moduleSpecifiers = getModuleSpecifier(sourceFile);
        // Set import alias
        updateImport({ moduleSpecifiers, alias: importAlias, filePath, relativeOutDir: outDir });
        await sourceFile?.save();

        spinner.stop();
        console.log(`${pc.bold("Fetched:")} ${pc.cyan(filePath)}`);
        const progress = (processedCount / totalCount) * 100;
        if (progress !== 100) {
          progressCallback(progress);
        }
      }
    }
  };

  const remoteComponentPath = `src/components/${componentName}`;

  const basePath = path.join(process.cwd(), outDir);
  const pathToSaveComponent = path.join(basePath, componentName);

  if (fileSystem.existsSync(pathToSaveComponent)) {
    const override = await overrideComponentPrompter();
    if (override) {
      await fs.rm(pathToSaveComponent, { recursive: true, force: true });
    } else {
      process.exit();
    }
  }

  if (!fileSystem.existsSync(basePath)) {
    await fs.mkdir(basePath, { recursive: true });
  }

  spinner.start();
  await recurse(remoteComponentPath);
  progressCallback(100);
  return pathToSaveComponent;
};
