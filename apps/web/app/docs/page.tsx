import fs from "fs-extra";
import { BlockViewer } from "@/components/ui/block-viewer";
import { mdxToHTML, SITE_URL } from "@/libs";
import path from "path";

export const dynamic = "force-dynamic";

const item = { name: "shad" };

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
  let treeData;
  try {
    const response = await fetch(`${SITE_URL}/api/tree`);
    treeData = await response.json();
  } catch (err) {
    treeData = [];
  }

  const docs = await getDocs();
  console.log("------------->TREE DATA<----------", { treeData });

  return (
    <div className="px-8 py-4">
      <BlockViewer item={item} highlightedFiles={null} tree={null} code={""} treeData={treeData} docs={docs} />
    </div>
  );
}
