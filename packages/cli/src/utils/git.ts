import path from "path";
import fs from "fs-extra";
import pc from "picocolors";
import { exec } from "child_process";

import { promisify } from "util";
import { _spinner } from "./spinners.js";
import { OWNER, REPO_CORE } from "./constants.js";
import { ensureString, handleSaveToFolder, processDirectory } from "./index.js";

const spinner = _spinner();
const execAsync = promisify(exec);

const cloneRepo = async (repoName: string, targetPath: string, sparsePath: string, otherSparsePath = "") => {
  await execAsync(
    `git clone --depth 1 --filter=blob:none --sparse https://github.com/${OWNER}/${repoName}.git ${targetPath}`,
  );
  await execAsync(
    `cd ${targetPath} && git sparse-checkout set ${sparsePath} ${otherSparsePath} --skip-checks`,
  );
};

const CORE_COMPONENTS = [
  { path: "packages/core/src/core", relativeParentPath: "src" },
  { path: "packages/core/src/styles", relativeParentPath: "src" },
  { path: "packages/core/src/utils", relativeParentPath: "src" },
  { path: "packages/core/src/components/MaterialCommunityIcon", relativeParentPath: "src/components" },
  { path: "packages/core/src/components/Portal", relativeParentPath: "src/components" },
  { path: "packages/core/src/types.tsx", relativeParentPath: "src" },
  { path: "packages/core/src/constants.tsx", relativeParentPath: "src" },
];

// const OTHER_SPARSES = CORE_COMPONENTS.slice(1).join(" ");

export const initProject = async (outDir: string, spinner: ReturnType<typeof _spinner>) => {
  let tempCoreDir: string = "";

  try {
    // spinner.start();

    // Create the base output directory
    fs.mkdirSync(outDir, { recursive: true });

    // Handle core components
    const corePath = path.join(outDir);

    // Set up temp directory for core
    tempCoreDir = path.join(outDir, "_temp_core");

    if (fs.existsSync(tempCoreDir)) {
      fs.rmSync(tempCoreDir, { recursive: true, force: true });
    }

    fs.mkdirSync(tempCoreDir);

    const progressCallback = (progress: number, currentFileOrFolderName?: string) => {
      spinner.fetch(`Fetching ${currentFileOrFolderName}...`);
      if (progress === 100) spinner.succeed("Done");
    };

    const coreComponentsPath: string[] = [];

    for (let { path: i, relativeParentPath } of CORE_COMPONENTS) {
      const installedPath = await handleSaveToFolder({
        outDir,
        log: false,
        progressCallback,
        absoluteComponentPath: i,
        relativeParentFolderPath: relativeParentPath,
      });

      coreComponentsPath.push(path.join(corePath, path.basename(i)));
      if (installedPath) {
        console.log(`${pc.green("✔︎")} ${pc.bold("Output Dir")}: ${pc.cyan(installedPath)}`);
      }
    }

    // Clone and process core
    // await cloneRepo(
    //   REPO_CORE,
    //   tempCoreDir,
    //   "packages/core/src/core",
    //   OTHER_SPARSES,
    // );

    // Move core files to final location
    // fs.mkdirSync(corePath, { recursive: true });

    // for (let i of CORE_COMPONENTS) {
    //   // If sparse is a file omit -r flag
    //   if (corePath.includes(".")) {
    //     await execAsync(
    //       `cp ${path.join(tempCoreDir, i)} ${corePath}`,
    //     );
    //   } else {
    //     await execAsync(
    //       `cp -r ${path.join(tempCoreDir, i)} ${corePath}`,
    //     );
    //   }
    //   coreComponentsPath.push(path.join(corePath, path.basename(i)));
    // }

    // Process the core components, and update imports

    const relativeOutDir = path.join(process.cwd(), outDir);
    await processDirectory(coreComponentsPath, relativeOutDir);

    // Clean up core temp directory
    fs.rmSync(tempCoreDir, { recursive: true, force: true });

    // spinner.succeed("Done");
  } catch (error: any) {
    if (tempCoreDir) {
      fs.rmSync(tempCoreDir, { recursive: true, force: true });
    }
    console.log(error);

    spinner.fail("Download failed");
  }
};

const removeTestFiles = async (filePath: string) => {
  try {
    const fileNames = fs.readdirSync(filePath, { encoding: "utf8", recursive: true });
    for (let fileName of fileNames) {
      // For some reason fs cannot delete empty __tests__ folder
      if (fileName.includes("__test__") || fileName.includes("__tests__") && fileName !== "__tests__") {
        const testFilePath = path.join(filePath, fileName);
        if (fs.existsSync(testFilePath)) {
          fs.rmSync(testFilePath, { recursive: true });
        }
      }
    }
  } catch (err: any) {
    console.log(pc.red(err));
  }
};

export const cloneSpecificFolder = async (
  {
    msg,
    repo,
    outDir,
    otherSparses,
    unwantedFolders,
    remoteComponentFolderPath,
  }: {
    msg?: string;
    repo: string;
    outDir: string;
    otherSparses?: string;
    unwantedFolders?: string[];
    remoteComponentFolderPath: string;
  },
) => {
  let tempDir: string = "";
  try {
    spinner.initialize();
    // Create the base output directory
    fs.mkdirSync(outDir, { recursive: true });

    // Handle component
    tempDir = path.join(outDir, "_temp");
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    fs.mkdirSync(tempDir);
    spinner.succeed();

    // Get components
    spinner.fetch(msg || "Fetching components...");
    await cloneRepo(repo, tempDir, remoteComponentFolderPath, otherSparses);
    spinner.succeed("Fetching: Done...");

    spinner.start("Setting up...");
    // Set up component directory
    const componentDir = outDir;

    fs.mkdirSync(componentDir, { recursive: true });

    // Remove unwanted folder e.g foo/bar/scripts
    if (unwantedFolders?.length) {
      for (const i of unwantedFolders) {
        try {
          await execAsync(
            `rm -rf ${path.join(tempDir, i)}`,
          );
        } catch (err) {
          console.log(err);
        }
      }
    }

    // Copy component files from temp folder to actual location
    const sparses = otherSparses ? otherSparses.split(" ") || [] : [];
    const coreComponentsPath: string[] = [];
    if (sparses.length) {
      for (const s of [...sparses, remoteComponentFolderPath]) {
        if (s === outDir) {
          await execAsync(`cp -r ${path.join(tempDir, s)}/* ${componentDir}`);
        } else {
          if (s.includes(".")) {
            await execAsync(`cp ${path.join(tempDir, s)} ${componentDir}/`);
          } else {
            await execAsync(`cp -r ${path.join(tempDir, s)} ${componentDir}/`);
          }
        }
        // Use the actual folder or file name of the core component(s) when
        // processing. Since they the are moved to the outdir as foo/core-folder-or file
        // and not foo/core/src/core-folder-or-file
        const componentFolderOrFileName = ensureString(s.split("src/").pop());
        coreComponentsPath.push(path.join(outDir, componentFolderOrFileName));
      }
    } else {
      await execAsync(
        `cp -rf ${path.join(tempDir, remoteComponentFolderPath)}/* ${componentDir}/`,
      );
    }

    // Cleanup and process
    fs.rmSync(tempDir, { recursive: true, force: true });

    // const allSparses = [...(otherSparses?.split(" ") || []), remoteComponentFolderPath];
    // const sparsesWithRelativePath = allSparses.map((s) => path.join(outDir, s)) || [];

    const relativeOutDir = path.join(process.cwd(), outDir);
    await processDirectory(coreComponentsPath, relativeOutDir);

    removeTestFiles(componentDir);
    spinner.succeed("Setting up: Done...");
    return componentDir;
  } catch (error: any) {
    // Stop spinners
    spinner.stop();
    // Clean up both temp directories if they exist
    if (tempDir) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    if (error.message.includes("No such file or directory")) {
      console.log(
        pc.green(
          `Hint: Probably ${pc.bold(remoteComponentFolderPath)} or ${pc.bold(outDir)} is not a valid component name`,
        ),
      );
    }
    console.error(error.message);
  }
};
