import { NextResponse } from "next/server";
import { generateTree, OUT_DIR } from "@/scripts";

const tree = generateTree(OUT_DIR);

export async function GET() {
  console.log(tree);
  return NextResponse.json(tree);
}
