import fs from "node:fs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

export async function highlightCode(code: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      transformers: [
        // transformerCopyButton({
        //   visibility: "always",
        //   feedbackDuration: 3_000,
        // }),
      ],
    })
    .use(rehypeStringify)
    .process(code);

  return String(file);
}

export const mdxToHTML = async (content: string) => {
  const file = await unified()
    .use(remarkParse) // Convert into markdown AST
    .use(remarkRehype) // Transform to HTML AST
    .use(rehypeSanitize) // Sanitize HTML input
    .use(rehypeStringify) // Convert AST into serialized HTML
    .process(content);

  return (String(file)); // <p>Hello, Next.js!</p>
};

export const isDir = (dir: string | Buffer<ArrayBufferLike>) => {
  return fs.lstatSync(dir).isDirectory();
};

export const isFile = (dir: string) => {
  return fs.lstatSync(dir).isFile();
};

export function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
