import fileSystem, { promises as fs } from "fs";
import path from "path";
import pc from "picocolors";
import { Octokit } from "octokit";
import { OWNER, REPO } from "./constants.js";
import { initializingSpinner } from "./helpers.js";
import { overrideComponentPrompter } from "./prompts.js";

const octokit = new Octokit({ auth: process.env.AUTH_TOKEN });

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
  const result = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
    owner: OWNER,
    repo: REPO,
    path: componentName,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  return result;
};

const handleSaveToFolder = async (
  outDir: string,
  componentName: string,
  progressCallback: (progress: number) => void,
) => {
  let processedCount = 0;
  let totalCount = 0;

  // await checkRateLimit();
  // return;

  const recurse = async (componentPath: string) => {
    const result = await handleGetContent(componentPath);
    const fileContent = result.data;
    // console.log(fileContent);

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
      const filePath = path.join(process.cwd(), handleCreateFilePath(outDir, fileContent.path));
      const pathSplit = fileContent.path.split("/");
      const folderPath = pathSplit.slice(0, pathSplit.length - 1).join("/");
      const compOutDir = path.join(process.cwd(), handleCreateFilePath(outDir, folderPath));

      await fs.mkdir(compOutDir, { recursive: true });
      const decodedContent = atob((fileContent as any).content);
      await handleCreateFile(decodedContent, filePath);

      initializingSpinner.stop();
      console.log(`${pc.bold("Fetched:")} ${pc.cyan(filePath)}`);
      const progress = (processedCount / totalCount) * 100;
      if (progress !== 100) {
        progressCallback(progress);
      }
    }
  };

  const remoteComponentPath = `src/components/${componentName}`;

  const basePath = path.join(process.cwd(), outDir);
  const pathToSaveComponent = path.join(basePath, componentName);

  if (fileSystem.existsSync(pathToSaveComponent)) {
    const override = await overrideComponentPrompter();
    if (override) {
      // const folderName = handleGetFolderName(outDir);
      await fs.rm(pathToSaveComponent, { recursive: true, force: true });
    } else {
      process.exit();
    }
  }

  if (!fileSystem.existsSync(basePath)) {
    await fs.mkdir(basePath, { recursive: true });
  }

  initializingSpinner.start();
  await recurse(remoteComponentPath);
  progressCallback(100);
  return pathToSaveComponent;
};

export { handleSaveToFolder };
