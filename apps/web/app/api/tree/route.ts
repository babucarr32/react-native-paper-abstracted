import { NextResponse } from "next/server";
import fs from "node:fs";
import { OUT_DIR, TreeType } from "@/scripts";
import path from "node:path";

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

const generateTree = (outDir: string): TreeType[] | undefined => {
  let dirs: string[] = [];
  const tree: TreeType[] = [];

  const OUT_DIR = outDir;
  console.log("------------->READ DIR<--------------", { OUT_DIR });

  if (fs.existsSync(OUT_DIR)) {
    if (fs.lstatSync(OUT_DIR).isDirectory()) {
      dirs = fs.readdirSync(OUT_DIR);
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

const dirss = fs.readdirSync(process.cwd());
console.log("------------->DIRECTORY CONTENT<--------------", { dirss });
const outDir = path.resolve(process.cwd(), OUT_DIR);

const tree = generateTree(outDir);

export async function GET() {
  const dirs = fs.readdirSync(path.resolve(process.cwd()));
  console.log("------------->READ DIR REUTURNED<--------------", tree);
  return NextResponse.json(tree);
}
