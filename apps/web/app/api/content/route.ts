import { NextRequest, NextResponse } from "next/server";

import fs from "fs-extra";
import path from "path";
import { highlightCode } from "@/libs";

async function getContent(filePath: string): Promise<{ raw: string; content: string }> {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(process.cwd(), filePath), { encoding: "utf8" }, async (err, data) => {
      if (err) {
        reject(err);
      }
      const template = `
\`\`\`ts
${data}
\`\`\`
`;
      const highlightedCode = await highlightCode(template);
      resolve({ raw: data, content: highlightedCode });
    });
  });
}

export async function POST(request: NextRequest) {
  const req = await request.json();

  const { path } = req;
  const content = await getContent(path);
  console.log(content);

  return NextResponse.json(content);
}
