"use server";
import fs from "fs-extra";
import path from "path";

import { highlightCode } from "./libs";

export async function getContent(filePath: string): Promise<{ raw: string; content: string }> {
  return new Promise((resolve, reject) => {
    const absolutePath = process.env.NODE_ENV === "production"
      ? path.join("/vercel/path0/apps/web", filePath)
      : path.join(process.cwd(), filePath);

    console.log("VERCEL ABSOLUTE", fs.readdirSync(absolutePath));
    console.log("VERCEL PATH0", fs.readdirSync("/vercel/path0"));
    console.log("VERCEL APPS", fs.readdirSync("/vercel/path0/apps"));
    console.log("VERCEL WEB", fs.readdirSync("/vercel/path0/apps/web"));

    fs.readFile(path.join(process.cwd(), filePath), { encoding: "utf8" }, async (err, data) => {
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
