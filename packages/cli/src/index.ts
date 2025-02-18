import fs from 'node:fs';
import pc from "picocolors"
import path from 'node:path';
import { Command } from 'commander';

import { spinner } from './utils/helpers.js';
import { RNPAConfig } from '../rnpa.config.js';
import { cloneSpecificFolder } from './utils/git.js';

const program = new Command();

program.command('add')
  .description('Add a new component')
  .argument('<string>', 'Component name')
  .action(async(str, options) => {
    const configPath = path.join(process.cwd(), 'rnpaconfig.json');

    fs.readFile(configPath, "utf-8", async(err, data) => {
      if (err) {
        console.log("rnpaconfig.json not found.")
      };

      const configuration = JSON.parse(data) as RNPAConfig
      const componentPath = await cloneSpecificFolder(configuration.outDir, str, spinner);
      if (componentPath) {
        const fullComponentPath = path.join(process.cwd(), componentPath);
        console.log(`${pc.green('✔︎')} Output Dir: ${fullComponentPath}`);    
      };
    });
  })
  .version('0.0.1');;

program.parse(process.argv);
