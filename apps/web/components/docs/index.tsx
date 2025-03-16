import Doc from "../../mdx/docs.mdx";
import { useMDXComponent } from "next-contentlayer/hooks";
import { allDocs } from "@/.contentlayer/generated";
import { mdxComponents } from "@/mdx-components";

const Docs = ({ data }: { data: string }) => {
  const MDXContent = useMDXComponent(allDocs[0]?.body.code || "");

  return (
    <div className="border dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 p-4 md:p-8">
      <div className="max-w-[800px]">
        <MDXContent components={mdxComponents} />
      </div>
    </div>
  );
};

export default Docs;
