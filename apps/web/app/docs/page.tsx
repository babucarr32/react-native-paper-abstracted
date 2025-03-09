import fs from "fs-extra";
import { BlockViewer } from "@/components/ui/block-viewer";
import { OUT_DIR, generateTree } from "@/scripts/index";
import { mdxToHTML } from "@/libs";
import path from "path";

export const dynamic = "force-dynamic";

const item = { name: "shad" };

const treeData = generateTree(OUT_DIR);

const getDocs = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(process.cwd(), "mdx/docs.mdx"), { encoding: "utf8" }, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      const content = mdxToHTML(data);
      resolve(content);
    });
  });
};

export default async function Page() {
  const docs = await getDocs();

  return (
    <div className="px-8 py-4">
      <BlockViewer item={item} highlightedFiles={null} tree={null} code={""} treeData={treeData} docs={docs} />
    </div>
  );
}
