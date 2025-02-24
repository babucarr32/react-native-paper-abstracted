import { BlockViewer } from "@/components/ui/block-viewer";
import { Code } from "@/components/ui/code";
import { highlightCode } from "@/libs";

const data = {};
const item = { name: "shad" };

const highlighted = `
\`\`\`ts
function BlockCopyCodeButton() {
  const { activeFile, item } = useBlockViewer();
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  const file = React.useMemo(() => {
    return item.files?.find((file) => file.target === activeFile);
  }, [activeFile, item.files]);

  const content = file?.content;

  if (!content) {
    return null;
  }

  return (
    <Button
      onClick={() => {
        copyToClipboard(content);
        trackEvent({
          name: "copy_block_code",
          properties: {
            name: item.name,
            file: file.path,
          },
        });
      }}
      className="h-7 w-7 shrink-0 rounded-lg p-0 hover:bg-zinc-700 hover:text-white focus:bg-zinc-700 focus:text-white focus-visible:bg-zinc-700 focus-visible:text-white active:bg-zinc-700 active:text-white data-[active=true]:bg-zinc-700 data-[active=true]:text-white [&>svg]:size-3"
      variant="ghost"
    >
      {isCopied ? <Check /> : <Clipboard />}
    </Button>
  );
}
\`\`\`
`;

export default async function Page() {
  const highlightedCode = await highlightCode(highlighted);

  // return <Code code={highlighted} />;
  return (
    <div className="p-8">
      <BlockViewer item={item} highlightedFiles={null} tree={null} code={highlightedCode} />
    </div>
  );
}
