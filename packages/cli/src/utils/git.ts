import path from "path";
import fs from "fs-extra";
import pc from "picocolors"
import { exec} from 'child_process';

import { promisify } from "util";
import { OWNER, REPO } from "./constants.js";

const execAsync = promisify(exec);

export const cloneSpecificFolder = async (outDir: string, componentFolderName: string, spinner: any) => {
  let tempDir: string = '';
  try {
    spinner.start();

    // Create the base output directory if it doesn't exist
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    // Create a temporary directory for the clone
    tempDir = path.join(outDir, '_temp');
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    fs.mkdirSync(tempDir);

    // Clone the repository into the temp directory
    await execAsync(
      `git clone --depth 1 --filter=blob:none --sparse https://github.com/${OWNER}/${REPO}.git ${tempDir}`
    );
    
    // Set up sparse checkout for the specific component
    await execAsync(
      `cd ${tempDir} && git sparse-checkout set src/components/${componentFolderName}`
    );

    // Create the final component directory
    const componentDir = path.join(outDir, componentFolderName);
    if (fs.existsSync(componentDir)) {
      fs.rmSync(componentDir, { recursive: true, force: true });
    }

    // Move the component files from temp to final location
    fs.mkdirSync(componentDir, { recursive: true });
    await execAsync(
      `cp -r ${path.join(tempDir, 'src/components', componentFolderName)}/* ${componentDir}`
    );

    // Clean up temp directory
    fs.rmSync(tempDir, { recursive: true, force: true });

    spinner.succeed('Done');
    return componentDir;
  } catch (error: any) {
    if (tempDir) {
      // Clean up temp directory
      fs.rmSync(tempDir, { recursive: true, force: true });
    };
    spinner.fail('Download failed');
    if (error.message.includes('No such file or directory')) {
      console.log(pc.green(`Hint: Probably ${pc.bold(componentFolderName)} is not a valid component name`))
    }
    console.error(error.message);
  }
};
