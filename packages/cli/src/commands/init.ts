import fs from "node:fs";
import pc from "picocolors";
import path from "node:path";

import { handleCreateConfigFile, initializingSpinner } from "../utils/helpers.js";
import { RNPAConfig } from "../../rnpa.config.js";
import { initProject } from "../utils/git.js";
import { createConfigPrompter, overrideConfigPrompter, prompter } from "../utils/prompts.js";

export const init = async () => {
  const configPath = path.join(process.cwd(), "rnpaconfig.json");
  let componentOutDir = "";

  try {
    const data = fs.readFileSync(configPath, "utf-8");
    if (data) {
      const override = await overrideConfigPrompter();
      if (override) {
        const { configOutDir: outDir, importAlias } = await prompter();
        componentOutDir = outDir;
        handleCreateConfigFile(configPath, outDir);
      }
    }
  } catch (err) {
    if (err) {
      const createConfigFile = await createConfigPrompter();
      if (createConfigFile) {
        const { configOutDir: outDir, importAlias } = await prompter();
        handleCreateConfigFile(configPath, outDir);
      }
    }
  }

  try {
    const data = fs.readFileSync(configPath, "utf-8");
    const { outDir } = JSON.parse(data) as RNPAConfig;

    if (!outDir) {
      console.log(
        pc.red(
          `Invalid configuration: ${pc.green("outDir")} ${
            pc.white(`not specified  in ${pc.green("rnpaConfig.json")}`)
          }`,
        ),
      );
      return;
    }
  } catch (err) {
    if (err) {
      console.log(pc.red("rnpaconfig.json not found."));
      return;
    }
  }

  initProject(componentOutDir, initializingSpinner);
};
