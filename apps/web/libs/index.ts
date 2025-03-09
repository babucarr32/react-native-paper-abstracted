import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSanitize from "rehype-sanitize";
import { transformerCopyButton } from "@rehype-pretty/transformers";

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

export const SITE_URL = process.env.NODE_ENV === "production"
  ? "https://react-native-paper-abstracted.vercel.app"
  : "http://localhost:3000";
