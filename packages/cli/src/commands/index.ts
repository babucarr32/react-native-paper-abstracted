import { Command } from "commander";

import { add } from "../commands/add.js";
import { init } from "../commands/init.js";

export const program = new Command();

program.command("init")
  .description("Setup the project to be compatible with React Native Paper Abstracted")
  .action(init);

program.command("add")
  .description("Add a new component")
  .argument("<string>", "Component name")
  .action(add);

program.version("0.0.8");
