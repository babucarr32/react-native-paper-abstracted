#!/usr/bin/env node

import fs from 'node:fs';
import pc from "picocolors"
import path from 'node:path';
import { Command } from 'commander';

import { handleCreateConfigFile, initializingSpinner, spinner } from './utils/helpers.js';
import { RNPAConfig } from '../rnpa.config.js';
import { cloneSpecificFolder, initProject } from './utils/git.js';
import { createConfigPrompter, overrideConfigPrompter, prompter } from './utils/prompts.js';

const program = new Command();

program.command('init')
  .action( async (str, options) => {
    const configPath = path.join(process.cwd(), 'rnpaconfig.json');
    let componentOutDir = '';

    try {
      const data = fs.readFileSync(configPath, "utf-8");
      if (data) {
        const override = await overrideConfigPrompter();
        if (override) {
          const { configOutDir: outDir, importAlias } = await prompter();
          componentOutDir = outDir;
          handleCreateConfigFile(configPath, outDir);
        };
      };
    } catch(err) {
      if (err) {
        const createConfigFile =  await createConfigPrompter();
        if (createConfigFile) {
          const { configOutDir: outDir, importAlias } = await prompter();
          handleCreateConfigFile(configPath, outDir);
        };
      };
    };
    
    try {
      const data = fs.readFileSync(configPath, "utf-8");
      const { outDir } = JSON.parse(data) as RNPAConfig;

      if (!outDir) {
        console.log(pc.red(`Invalid configuration: ${pc.green('outDir')} ${pc.white(`not specified  in ${pc.green('rnpaConfig.json')}`)}`))
        return;
      };
    } catch(err) {
     if (err) {
        console.log(pc.red("rnpaconfig.json not found."))
        return;
      };
    };

    initProject(componentOutDir, initializingSpinner);
  });

program.command('add')
  .description('Add a new component')
  .argument('<string>', 'Component name')
  .action(async(str, options) => {
    const configPath = path.join(process.cwd(), 'rnpaconfig.json');

    fs.readFile(configPath, "utf-8", async(err, data) => {
      if (err) {
        console.log(pc.red("rnpaconfig.json not found."))
        return;
      };

      const { outDir } = JSON.parse(data) as RNPAConfig;

      if (!outDir) {
        console.log(pc.red(`Invalid configuration: ${pc.green('outDir')} not found specified.`))
        return;
      }

      const componentPath = await cloneSpecificFolder(outDir, str, spinner);

      if (componentPath) {
        const fullComponentPath = path.join(process.cwd(), componentPath);
        console.log(`${pc.green('✔︎')} Output Dir: ${fullComponentPath}`);    
      };
    });
  })
  .version('0.0.1');;

program.parse(process.argv);
