import fs from "node:fs";
import pc from "picocolors";
import path from "node:path";

import { _spinner } from "../utils/spinners.js";
import { RNPAConfig } from "../../rnpa.config.js";
import { handleSaveToFolder } from "../utils/index.js";

const spinner = _spinner();

export const add = async (str: string) => {
  const configPath = path.join(process.cwd(), "rnpaconfig.json");

  fs.readFile(configPath, "utf-8", async (err, data) => {
    if (err) {
      console.log(pc.red("rnpaconfig.json not found."));
      return;
    }

    const { outDir, alias } = JSON.parse(data) as RNPAConfig;

    if (!outDir) {
      console.log(pc.red(`Invalid configuration: ${pc.green("outDir")} not found specified.`));
      return;
    }

    const progressCallback = (progress: number) => {
      spinner.fetch();
      if (progress === 100) spinner.succeed("Done");
    };

    const installedPath = await handleSaveToFolder({
      outDir,
      progressCallback,
      componentName: str,
      importAlias: alias,
    });

    if (installedPath) {
      console.log(`${pc.green("✔︎")} ${pc.bold("Output Dir")}: ${pc.cyan(installedPath)}`);
    }
  });
};
