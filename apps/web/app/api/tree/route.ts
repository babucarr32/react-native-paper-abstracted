import { NextResponse } from "next/server";
import fs from "node:fs";
import { generateTree, OUT_DIR } from "@/scripts";
import path from "node:path";

const tree = generateTree(OUT_DIR);

export async function GET() {
  const dirs = fs.readdirSync(path.resolve(process.cwd()));
  console.log("------------->READ DIR<--------------", dirs);
  return NextResponse.json(tree);
}
