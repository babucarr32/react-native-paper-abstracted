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

  fs.readdir(path.resolve()).then((r) => {
    console.log("0000000", r);
  }).catch((err) => {
    console.log("ERRRRR", err);
  });

  if (fs.existsSync(path.resolve(outDir))) {
    if (fs.lstatSync(outDir).isDirectory()) {
      dirs = fs.readdirSync(path.resolve(outDir));
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
  }
  return undefined;
};
