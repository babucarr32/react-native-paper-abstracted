import ora from 'ora';
import pc from "picocolors"
import { BLUE, RED, YELLOW } from "./constants.js";

export function hexToAnsi256(sHex: string): number {
  const rgb = parseInt(sHex.slice(1), 16);
  const r = Math.floor(rgb / (256 * 256)) % 256;
  const g = Math.floor(rgb / 256) % 256;
  const b = rgb % 256;

  const ansi =
    16 +
    36 * Math.round((r / 255) * 5) +
    6 * Math.round((g / 255) * 5) +
    Math.round((b / 255) * 5);
  return ansi;
}

export const hex = (color: string): ((text: string) => string) => {
  const ansiColor = hexToAnsi256(color);
  return (text: string) => `\x1b[38;5;${ansiColor}m${text}${pc.reset("")}`;
};

export const turboRed = hex(RED);
export const turboBlue = hex(BLUE);
export const turboYellow = hex(YELLOW);

export const spinner = ora({
  text: "Running...",
  spinner: {
    frames: ["   ", turboBlue(">  "), turboYellow(">> "), turboRed(">>>")],
  },
});
