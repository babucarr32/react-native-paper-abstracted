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

export const initProject = async (outDir: string, spinner: any) => {
  let tempCoreDir: string = '';
 
  try {
    spinner.start();
    
    // Create the base output directory
    fs.mkdirSync(outDir, { recursive: true });

    // Handle core components
    const corePath = path.join(outDir);

    // Set up temp directory for core
    tempCoreDir = path.join(outDir, '_temp_core');

    if (fs.existsSync(tempCoreDir)) {
      fs.rmSync(tempCoreDir, { recursive: true, force: true });
    };

    fs.mkdirSync(tempCoreDir);

    // Clone and process core
    await cloneRepo(REPO_CORE, tempCoreDir, 'packages/core/src');
    
    // Move core files to final location
    fs.mkdirSync(corePath, { recursive: true });
    await execAsync(
      `cp -r ${path.join(tempCoreDir, 'packages/core/src')}/* ${corePath}`
    );
    
    // Clean up core temp directory
    fs.rmSync(tempCoreDir, { recursive: true, force: true });

   spinner.succeed('Done');
  } catch (error: any) {
   if (tempCoreDir) {
      fs.rmSync(tempCoreDir, { recursive: true, force: true });
    }
    
    spinner.fail('Download failed');
  }
};


export const cloneSpecificFolder = async (outDir: string, componentFolderName: string, spinner: any) => {
  let tempDir: string = '';  
  try {
    spinner.start();   
    // Create the base output directory
    fs.mkdirSync(outDir, { recursive: true });

    // Handle component
    tempDir = path.join(outDir, '_temp');
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    fs.mkdirSync(tempDir);

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
    processDirectory(componentDir, componentFolderName, outDir);
    
    spinner.succeed('Done');
    return componentDir;

  } catch (error: any) {
    // Clean up both temp directories if they exist
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
