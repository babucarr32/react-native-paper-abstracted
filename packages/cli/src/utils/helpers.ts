import fs from "fs";
import path from "path";

import ora from "ora";
import pc from "picocolors";
import { Project, SourceFile, StringLiteral } from "ts-morph";

import { BLUE, RED, YELLOW } from "./constants.js";

const project = new Project();

export const hexToAnsi256 = (sHex: string): number => {
  const rgb = parseInt(sHex.slice(1), 16);
  const r = Math.floor(rgb / (256 * 256)) % 256;
  const g = Math.floor(rgb / 256) % 256;
  const b = rgb % 256;

  const ansi = 16
    + 36 * Math.round((r / 255) * 5)
    + 6 * Math.round((g / 255) * 5)
    + Math.round((b / 255) * 5);
  return ansi;
};

export const hex = (color: string): (text: string) => string => {
  const ansiColor = hexToAnsi256(color);
  return (text: string) => `\x1b[38;5;${ansiColor}m${text}${pc.reset("")}`;
};

export const turboRed = hex(RED);
export const turboBlue = hex(BLUE);
export const turboYellow = hex(YELLOW);

export const spinner = ora({
  text: "Fetching content...",
  spinner: {
    frames: ["   ", turboBlue(">  "), turboYellow(">> "), turboRed(">>>")],
  },
});

export const initializingSpinner = ora({
  text: "Initializing...",
});

export const settingUpSpinner = ora({
  text: "Initializing...",
});

const replacePathsInFile = (filePath: string, componentName: string, outDirInConfig: string): void => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }

    // Regex to match paths starting with ./ or ../
    // const regex = /from\s+(['"])(?:\.\.?\/)+([^'"]+)/g;
    const regex = /from\s+'(\.\.\/\.\.\/)+/g;
    const result = data.replace(regex, (match) => {
      // Count the number of '../' occurrences
      const depth = match.split("../").length - 1;
      // Create a new path with one less '../'
      return `from '${"../".repeat(depth - 1)}`;
    });

    // // Write the modified content back to the file
    // fs.writeFile(filePath, result, "utf8", (err) => {
    //   // if (err) {
    //   //     console.error(`Error writing file ${filePath}:`, err);
    //   // } else {
    //   //     console.log(`Updated paths in ${filePath}`);
    //   // }
    // });
  });
};

const getModuleSpecifier = (sourceFile: SourceFile | undefined) => {
  const imports = sourceFile?.getImportDeclarations() || [];
  return imports.map((i) => i.getModuleSpecifier());
};

const updateImport = (moduleSpecifiers: StringLiteral[]) => {
  for (let s of moduleSpecifiers) {
    const literal = s.getLiteralValue();
    if (literal.includes("components/")) {
      const newImport = literal.split("components/").join("");
      s.setLiteralValue(newImport);
      // console.log({ newImport });
    }
  }
};

export const processDirectory = async (componentsDir: string[]): Promise<void> => {
  for (let compDir of componentsDir) {
    try {
      // If current is a directory
      if (fs.lstatSync(compDir).isDirectory()) {
        const dirs = fs.readdirSync(compDir);
        for (let dir of dirs) {
          const compPath = path.join(compDir, dir);

          if (fs.lstatSync(compPath).isFile()) {
            project.addSourceFileAtPath(compPath);
            const sourceFile = project.getSourceFile(compPath);
            // Get import statements
            const moduleSpecifiers = getModuleSpecifier(sourceFile);
            updateImport(moduleSpecifiers);
            await sourceFile?.save();

            // console.log(imports);
          }
        }
      } else {
        // Get import statements
        const sourceFile = project.getSourceFile(compDir);
        const moduleSpecifiers = getModuleSpecifier(sourceFile);
        updateImport(moduleSpecifiers);
        await sourceFile?.save();
        // console.log(imports);
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export const handleCreateConfigFile = (configPath: string, outDir: string) => {
  const data = { outDir };
  const dataString = JSON.stringify(data, null, 2);
  try {
    fs.writeFileSync(configPath, dataString, "utf8");
  } catch (err) {
    console.log(err);
  }
};
