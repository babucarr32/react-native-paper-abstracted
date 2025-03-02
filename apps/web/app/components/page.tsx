import { BlockViewer } from "@/components/ui/block-viewer";
import { OUT_DIR, generateTree } from "@/scripts/index";

const item = { name: "shad" };

const treeData = generateTree(OUT_DIR);

export default async function Page() {
  return (
    <div className="px-8 py-4">
      <BlockViewer item={item} highlightedFiles={null} tree={null} code={""} treeData={treeData} />
    </div>
  );
}
