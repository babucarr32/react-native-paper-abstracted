import { Command } from "commander";

import { add } from "../commands/add.js";
import { init } from "../commands/init.js";

export const program = new Command();

program.command("init")
  .action(init);

program.command("add")
  .description("Add a new component")
  .argument("<string>", "Component name")
  .action(add)
  .version("0.0.1");
