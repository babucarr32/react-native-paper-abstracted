import fs from "fs-extra";
import path from "path";

export const OUT_DIR = "__components__";

export type TreeType = {
  name: string;
  path: string;
  children?: TreeType[];
};

const isDir = (dir: string) => {
  return fs.lstatSync(dir).isDirectory();
};

const isFile = (dir: string) => {
  return fs.lstatSync(dir).isFile();
};

const getDirs = (directory: string) => {
  const result: TreeType[] = [];
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

export const generateTree = (outDir: string): TreeType[] | undefined => {
  let dirs: string[] = [];
  const tree: TreeType[] = [];
  const outputDirectory = path.resolve(process.cwd(), outDir);

  if (!fs.existsSync(outputDirectory)) return undefined;

  if (fs.lstatSync(outputDirectory).isDirectory()) {
    dirs = fs.readdirSync(outputDirectory);
  }

  for (let dir of dirs) {
    const absoluteFilePath = path.join(outputDirectory, dir);
    const relativeFilePath = path.join(outDir, dir);
    if (fs.lstatSync(absoluteFilePath).isDirectory()) {
      tree.push({
        name: dir,
        path: relativeFilePath,
        children: getDirs(relativeFilePath),
      });
    } else {
      tree.push({
        name: dir,
        path: relativeFilePath,
      });
    }

    generateTree(absoluteFilePath);
  }
  return tree;
};
