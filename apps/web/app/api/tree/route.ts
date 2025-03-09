import { NextResponse } from "next/server";
import { generateTree, OUT_DIR } from "@/scripts";

const tree = generateTree(OUT_DIR);

export async function GET() {
  return NextResponse.json(tree);
}
