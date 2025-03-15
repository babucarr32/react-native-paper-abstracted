"use server";
import fs from "fs-extra";
import path from "path";

import { highlightCode, isDir } from "./libs";
import { OUT_DIR } from "./scripts";

export type ContentType = { raw: string; content: string } | undefined;
type ContentReturnType<T extends string | undefined> = Promise<
  T extends string ? Record<string, ContentType> : ContentType
>;

const handleReadFile = async (filePath: string): Promise<ContentType> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "utf8" }, async (err, data) => {
      if (err) {
        reject(err);
      }
      const template = `
\`\`\`ts showLineNumbers
${data}
\`\`\`
`;
      const highlightedCode = await highlightCode(template);
      resolve({ raw: data, content: highlightedCode });
    });
  });
};

const getPathFromAbsPath = (p: string) => p.substring(p.indexOf(OUT_DIR));

export async function getContent<T extends string | undefined>(
  filePath: string,
  dirPath?: T,
): ContentReturnType<T> {
  const dirData: Record<string, ContentType> = {};

  if (dirPath && dirPath.endsWith("components")) return {} as any as ContentReturnType<T>;

  try {
    if (dirPath) {
      const dirs = await fs.readdir(dirPath, { recursive: true });
      for (let d of dirs) {
        const currentFilePath = path.join(dirPath, String(d));
        if (isDir(currentFilePath)) {
          getContent("", currentFilePath as string);
        } else {
          const key = getPathFromAbsPath(currentFilePath);
          const result = await handleReadFile(key) || {} as ContentType;
          dirData[currentFilePath] = result;
        }
      }
      return dirData as any as ContentReturnType<T>;
    }
    return handleReadFile(filePath) as any as ContentReturnType<T>;
  } catch (err) {
    console.log(err);
    return undefined as any as ContentReturnType<T>;
  }
}
