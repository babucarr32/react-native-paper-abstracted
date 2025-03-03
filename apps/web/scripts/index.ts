import fs from "fs-extra";
import { fetchComponents } from "@react-native-paper-abstracted/core/fetch-components";
import path from "path";

// fetchComponents("__components__", "src/core", "src/components src/utils src/styles");

export const OUT_DIR = "__components__";

export type Tree = {
  name: string;
  path: string;
  children?: Tree[];
};

const isDir = (dir: string) => {
  return fs.lstatSync(dir).isDirectory();
};

const isFile = (dir: string) => {
  return fs.lstatSync(dir).isFile();
};

const getDirs = (directory: string) => {
  const result: Tree[] = [];
  const dirs = fs.readdirSync(directory);

  for (let dir of dirs) {
    let fileName = "";
    const filePath = path.join(directory, dir);

    fileName = dir.split("/").pop() || "";

    if (isFile(filePath)) {
      result.push({
        name: fileName,
        path: filePath,
      });
    } else if (isDir(filePath)) {
      result.push({
        name: fileName,
        path: filePath,
        children: getDirs(filePath),
      });
    }
  }
  return result;
};

export const generateTree = (outDir: string): Tree[] => {
  let dirs: string[] = [];
  const tree: Tree[] = [];

  if (fs.lstatSync(outDir).isDirectory()) {
    dirs = fs.readdirSync(outDir);
  }

  for (let dir of dirs) {
    const filePath = path.join(outDir, dir);
    if (fs.lstatSync(filePath).isDirectory()) {
      tree.push({
        name: dir,
        path: filePath,
        children: getDirs(filePath),
      });
    }

    generateTree(filePath);
  }
  return tree;
};
