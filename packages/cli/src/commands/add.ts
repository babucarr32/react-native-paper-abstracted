import fs from "node:fs";
import pc from "picocolors";
import path from "node:path";

import { spinner } from "../utils/helpers.js";
import { RNPAConfig } from "../../rnpa.config.js";
import { handleSaveToFolder } from "../utils/index.js";

export const add = async (str: string) => {
  const configPath = path.join(process.cwd(), "rnpaconfig.json");

  fs.readFile(configPath, "utf-8", async (err, data) => {
    if (err) {
      console.log(pc.red("rnpaconfig.json not found."));
      return;
    }

    const { outDir } = JSON.parse(data) as RNPAConfig;

    if (!outDir) {
      console.log(pc.red(`Invalid configuration: ${pc.green("outDir")} not found specified.`));
      return;
    }

    const installedPath = await handleSaveToFolder(outDir, str, (progress) => {
      spinner.start();
      if (progress === 100) spinner.succeed("Done");
    });

    // const componentPath = await cloneSpecificFolder(outDir, str, spinner);

    if (installedPath) {
      console.log(`${pc.green("✔︎")} ${pc.bold("Output Dir")}: ${pc.cyan(installedPath)}`);
    }
  });
};
