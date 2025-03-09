import ora from "ora";
import { turboBlue, turboRed, turboYellow } from "./index.js";

export const _spinner = () => {
  const loader = ora();
  return ({
    fetch: (msg = "Fetching content...") => {
      loader.start(msg);
      loader.spinner = {
        frames: ["   ", turboBlue(">  "), turboYellow(">> "), turboRed(">>>")],
      };
    },
    initialize: (msg = "Initializing...") => {
      loader.start(msg);
    },
    stop: () => loader.stop(),
    fail: (msg?: string) => loader.fail(msg),
    start: (msg?: string) => loader.start(msg),
    succeed: (msg?: string) => loader.succeed(msg),
  });
};
