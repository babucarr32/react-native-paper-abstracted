import path from "path";
import fs from "fs-extra";
import pc from "picocolors"
import { exec} from 'child_process';

import { promisify } from "util";
import { OWNER, REPO, REPO_CORE } from "./constants.js";

import { processDirectory } from "./helpers.js";

const execAsync = promisify(exec);

const cloneRepo = async (repoName: string, targetPath: string, sparsePath: string) => {
  await execAsync(
    `git clone --depth 1 --filter=blob:none --sparse https://github.com/${OWNER}/${repoName}.git ${targetPath}`
  );
  await execAsync(
    `cd ${targetPath} && git sparse-checkout set ${sparsePath}`
  );
};

export const cloneSpecificFolder = async (outDir: string, componentFolderName: string, spinner: any) => {
  let tempDir: string = '';
  try {
    spinner.start();
    
    // Create the base output directory
    fs.mkdirSync(outDir, { recursive: true });

    // Set up temp directory
    tempDir = path.join(outDir, '_temp');
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    fs.mkdirSync(tempDir);

    // Handle core components
    const corePath = path.join(outDir, 'core');
    const currentDir = process.cwd();

    if (!fs.existsSync(corePath)) {    
      fs.mkdirSync(corePath, { recursive: true });
      await cloneRepo(REPO_CORE, corePath, 'packages/core/src');
      await execAsync(`cd ${currentDir}`);
    }

    // Handle component
    await cloneRepo(REPO, tempDir, `src/components/${componentFolderName}`);
    
    // Set up component directory
    const componentDir = path.join(outDir, componentFolderName);
    if (fs.existsSync(componentDir)) {
      fs.rmSync(componentDir, { recursive: true, force: true });
    }
    fs.mkdirSync(componentDir, { recursive: true });

    // Copy component files
    await execAsync(
      `cp -r ${path.join(tempDir, 'src/components', componentFolderName)}/* ${componentDir}`
    );

    // Cleanup and process
    fs.rmSync(tempDir, { recursive: true, force: true });
    processDirectory(componentDir);
    
    spinner.succeed('Done');
    return componentDir;

  } catch (error: any) {
    if (tempDir) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    spinner.fail('Download failed');
    if (error.message.includes('No such file or directory')) {
      console.log(pc.green(`Hint: Probably ${pc.bold(componentFolderName)} is not a valid component name`));
    }
    console.error(error.message);
  }
};
