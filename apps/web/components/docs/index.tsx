import Doc from "../../mdx/docs.mdx";
const Docs = ({ data }: { data: string }) => {
  return (
    <div className="border dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 p-8">
      <div className="max-w-[800px]">
        <Doc />
      </div>
    </div>
  );
};

export default Docs;
