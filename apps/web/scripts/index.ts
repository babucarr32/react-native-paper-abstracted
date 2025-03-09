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

  const OUT_DIR = path.resolve(outDir);
  if (fs.existsSync(OUT_DIR)) {
    if (fs.lstatSync(OUT_DIR).isDirectory()) {
      dirs = fs.readdirSync(OUT_DIR);
    }

    for (let dir of dirs) {
      console.log("---------", dir);
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
  }
  return undefined;
};
