import path from "path";
import fs from "fs-extra";
import pc from "picocolors";
import { exec } from "child_process";

import { promisify } from "util";
import { OWNER, REPO, REPO_CORE } from "./constants.js";

import { initializingSpinner, processDirectory, settingUpSpinner, spinner } from "./helpers.js";

const execAsync = promisify(exec);

const cloneRepo = async (repoName: string, targetPath: string, sparsePath: string, otherSparsePath = "") => {
  await execAsync(
    `git clone --depth 1 --filter=blob:none --sparse https://github.com/${OWNER}/${repoName}.git ${targetPath}`,
  );
  await execAsync(
    `cd ${targetPath} && git sparse-checkout set ${sparsePath} ${otherSparsePath} --skip-checks`,
  );
};

export const initProject = async (outDir: string, spinner: any) => {
  let tempCoreDir: string = "";

  try {
    spinner.start();

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

    // Clone and process core
    await cloneRepo(
      REPO_CORE,
      tempCoreDir,
      "packages/core/src/core",
      "packages/core/src/styles packages/core/src/utils packages/core/src/components/MaterialCommunityIcon packages/core/src/components/Portal packages/core/src/types.tsx",
    );
    // Move core files to final location
    fs.mkdirSync(corePath, { recursive: true });
    await execAsync(
      `cp -r ${path.join(tempCoreDir, "packages/core/src/core")} ${corePath}`,
    );
    await execAsync(
      `cp -r ${path.join(tempCoreDir, "packages/core/src/styles")} ${corePath}`,
    );
    await execAsync(
      `cp -r ${path.join(tempCoreDir, "packages/core/src/utils")} ${corePath}`,
    );
    await execAsync(
      `cp ${path.join(tempCoreDir, "packages/core/src/types.tsx")} ${corePath}`,
    );
    await execAsync(
      `cp -r ${path.join(tempCoreDir, "packages/core/src/components/MaterialCommunityIcon")} ${corePath}`,
    );
    await execAsync(
      `cp -r ${path.join(tempCoreDir, "packages/core/src/components/Portal")} ${corePath}`,
    );

    // Clean up core temp directory
    fs.rmSync(tempCoreDir, { recursive: true, force: true });

    spinner.succeed("Done");
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

const stopSpinners = () => {
  initializingSpinner.stop();
  settingUpSpinner.stop();
  spinner.stop();
};

export const cloneSpecificFolder = async (outDir: string, remoteComponentFolderPath: string, otherSparses?: string) => {
  let tempDir: string = "";
  // return;
  try {
    initializingSpinner.start();
    // Create the base output directory
    fs.mkdirSync(outDir, { recursive: true });

    // Handle component
    tempDir = path.join(outDir, "_temp");
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    fs.mkdirSync(tempDir);
    initializingSpinner.succeed();

    // Get components
    spinner.start();
    await cloneRepo(REPO, tempDir, remoteComponentFolderPath, otherSparses);
    spinner.succeed("Fetching: Done...");

    settingUpSpinner.start();
    // Set up component directory
    const componentDir = outDir;

    // if (fs.existsSync(componentDir)) {
    //   fs.rmSync(componentDir, { recursive: true, force: true });
    // }

    fs.mkdirSync(componentDir, { recursive: true });

    // Copy component files from temp folder to actual location
    const sparses = otherSparses?.split(" ") || [];
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
      }
    } else {
      await execAsync(
        `cp -rf ${path.join(tempDir, remoteComponentFolderPath)}/* ${componentDir}/`,
      );
    }

    // Cleanup and process
    fs.rmSync(tempDir, { recursive: true, force: true });

    processDirectory([...sparses, remoteComponentFolderPath]);

    removeTestFiles(componentDir);
    settingUpSpinner.succeed("Setting up: Done...");
    return componentDir;
  } catch (error: any) {
    // Stop all spinners
    stopSpinners();
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
