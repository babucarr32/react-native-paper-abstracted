// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { visit } from "unist-util-visit";
import rehypePrettyCode from "rehype-pretty-code";

export const Post = defineDocumentType(() => ({
  name: "Docs",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  // fields: {
  //   title: { type: "string", required: true },
  //   date: { type: "date", required: true },
  // },
  // computedFields: {
  //   url: { type: "string", resolve: (post) => `/docs/${post._raw.flattenedPath}` },
  // },
}));

export default makeSource({
  contentDirPath: "mdx",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      () => (tree) => {
        console.log("VISITING... 5");
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [codeEl] = node.children;

            if (codeEl.tagName !== "code") return;

            node.__rawString__ = codeEl.children?.[0].value;
          }
        });
      },
      [
        // @ts-ignore
        rehypePrettyCode,
        {
          // theme: "github-dark",
          keepBackground: false,
          onVisitLine(node: any) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
        },
      ],
      () => (tree) => {
        visit(tree, (node) => {
          console.log("VISITING...");
          if (node?.type === "element" && node?.tagName === "figure") {
            if (!("data-rehype-pretty-code-figure" in node.properties)) {
              console.log("VISITING... 3");
              return;
            }

            const preElement = node.children.at(-1);
            if (preElement.tagName !== "pre") {
              return;
            }

            preElement.properties["__rawString__"] = node.__rawString__;
          }
        });
      },
    ],
  },
});
