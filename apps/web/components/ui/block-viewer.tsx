"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  Clipboard,
  Divide,
  File,
  Folder,
  Fullscreen,
  Monitor,
  Slash,
  Smartphone,
  Tablet,
  Terminal,
} from "lucide-react";
import { ImperativePanelHandle } from "react-resizable-panels";
// import { registryItemFileSchema, registryItemSchema } from "shadcn/registry";
import { z } from "zod";
import { getContent } from "@/actions";

import { trackEvent } from "@/components/lib/events";
// import { FileTree, createFileTreeForRegistryItemFiles } from "@/lib/registry";
import { useCopyToClipboard } from "@/hooks/copy-to-clipboard";
// import { V0Button } from "@/components/v0-button";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
// import { trees } from "@/data";
import { highlightCode } from "@/libs";
import { Tree } from "@/scripts";
// import { Style } from "@/registry/registry-styles";

const V0Button = () => <Button>V0Button</Button>;

export type FileTree = {
  name: string;
  path?: string;
  children?: FileTree[];
};

type BlockViewerContext = {
  item: z.infer<any>;
  view: "code" | "preview";
  setView: (view: "code" | "preview") => void;
  style?: any;
  setStyle: (style: any) => void;
  activeFile: string | null;
  preview?: boolean;
  fileContent?: string;
  setFileContent: React.Dispatch<React.SetStateAction<string>>;
  togglePreview?: () => void;
  setActiveFile: (file: string) => void;
  resizablePanelRef: React.RefObject<ImperativePanelHandle> | null;
  tree: ReturnType<any> | null;
  highlightedFiles:
    | (z.infer<any> & {
      highlightedContent: string;
    })[]
    | null;
};

const BlockViewerContext = React.createContext<BlockViewerContext | null>(null);

function useBlockViewer() {
  const context = React.useContext(BlockViewerContext);
  if (!context) {
    throw new Error("useBlockViewer must be used within a BlockViewerProvider.");
  }
  return context;
}

function BlockViewerProvider({
  item,
  tree,
  highlightedFiles,
  children,
}: Pick<BlockViewerContext, "item" | "tree" | "highlightedFiles"> & {
  children: React.ReactNode;
}) {
  const [preview, setPreview] = React.useState(false);
  const [fileContent, setFileContent] = React.useState("");
  const [view, setView] = React.useState<BlockViewerContext["view"]>("preview");
  // const [style, setStyle] = React.useState<BlockViewerContext["style"]>("new-york");
  const [style, setStyle] = React.useState<BlockViewerContext["style"]>("");
  const [activeFile, setActiveFile] = React.useState<
    BlockViewerContext["activeFile"]
  >("__components__/components/ActivityIndicator/index.tsx" ?? null);
  const resizablePanelRef = React.useRef<ImperativePanelHandle>(null);

  const togglePreview = () => {
    setPreview(!preview);
  };

  return (
    <BlockViewerContext.Provider
      value={{
        item,
        view,
        setView,
        style,
        togglePreview,
        preview,
        setStyle,
        setFileContent,
        fileContent,
        resizablePanelRef: resizablePanelRef as any,
        activeFile,
        setActiveFile,
        tree,
        highlightedFiles,
      }}
    >
      <div
        id={item.name}
        className="group/block-view-wrapper flex min-w-0 flex-col items-stretch gap-4"
        style={{
          "--height": item.meta?.iframeHeight ?? "930px",
        } as React.CSSProperties}
      >
        {children}
      </div>
    </BlockViewerContext.Provider>
  );
}

function BlockViewerToolbar() {
  const { setView, togglePreview, item, resizablePanelRef, style, activeFile } = useBlockViewer();
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  const componentName = activeFile?.split("/")[2]?.split(".")[0] || "";
  const activeComponentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

  return (
    <div className="flex w-full items-center gap-2 md:pr-[14px]">
      <a
        href={`#${item.name}`}
        className="text-sm font-medium underline-offset-2 hover:underline"
      >
        {item.description}
      </a>
      <div className="ml-auto hidden items-center gap-2 md:flex">
        <Separator orientation="vertical" className="mx-1 hidden h-4 md:flex" />
        <div className="flex h-7 items-center gap-1 rounded-md border p-[2px]">
          <Button
            variant="ghost"
            className="hidden h-[22px] w-auto gap-1 rounded-sm px-2 md:flex lg:w-auto"
            size="sm"
            onClick={() => {
              copyToClipboard(`npx rnpa add ${activeComponentName}`);
            }}
          >
            {isCopied ? <Check /> : <Terminal />}
            <span className="hidden lg:inline">npx rnpa add {activeComponentName}</span>
          </Button>
        </div>
        <Button size={"sm"} variant={"outline"} onClick={togglePreview}>
          Preview
        </Button>
        <Separator orientation="vertical" className="mx-1 hidden h-4 xl:flex" />
        <Button size={"sm"} variant={"outline"}>
          Docs
        </Button>
      </div>
    </div>
  );
}

const Preview = () => {
  return (
    <div className="w-[400px]  border-l h-full">
      <div className="flex h-12 items-center border-b border-zinc-700 bg-zinc-900" />
      <div className="p-2 ">
        <Image src={"images/phone.png"} alt="Component image" height={900} width={400} // https://www.vecteezy.com/members/phanithi
        />
      </div>
    </div>
  );
};

function BlockViewerCode({ treeData }: { code: string; treeData: Tree[] }) {
  const { activeFile, preview, setFileContent, highlightedFiles } = useBlockViewer();
  const [code, setCode] = React.useState("");
  // const file = React.useMemo(() => {
  //   return highlightedFiles?.find((file) => file.target === activeFile);
  // }, [highlightedFiles, activeFile]);

  // if (!file) {
  //   return null;
  // }
  const file = {};

  React.useEffect(() => {
    (async () => {
      if (activeFile) {
        getContent(activeFile).then((result) => {
          const { raw, content } = result;
          setFileContent(raw);
          setCode(content);
        }).catch((err) => {});
      }
    })();
  }, [activeFile]);
  // return (
  //   <div
  //     // key={file?.path}
  //     // data-rehype-pretty-code-fragment
  //     // dangerouslySetInnerHTML={{ __html: file?.highlightedContent ?? "" }}
  //     dangerouslySetInnerHTML={{ __html: highlighted ?? "" }}
  //     // className="relative flex-1 overflow-hidden after:absolute after:inset-y-0 after:left-0 after:w-10 after:bg-zinc-950 [&_.line:before]:sticky [&_.line:before]:left-2 [&_.line:before]:z-10 [&_.line:before]:translate-y-[-1px] [&_.line:before]:pr-1 [&_pre]:h-[--height] [&_pre]:overflow-auto [&_pre]:!bg-transparent [&_pre]:pb-20 [&_pre]:pt-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed"
  //   />
  // );

  return (
    <div className="mr-[14px] border-r border-b flex overflow-hidden rounded-xl bg-zinc-950 text-white group-data-[view=preview]/block-view-wrapper:hidden md:h-screen">
      <div className="w-[280px]">
        <BlockViewerFileTree treeData={treeData} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 items-center gap-2 border-b border-zinc-700 bg-zinc-900 px-4 text-sm font-medium">
          <File className="size-4" />
          {(file as any)?.target}
          <div className="ml-auto flex items-center gap-2">
            <BlockCopyCodeButton />
          </div>
        </div>
        <div
          // key={file?.path}
          data-rehype-pretty-code-fragment
          // dangerouslySetInnerHTML={{ __html: file?.highlightedContent ?? "" }}
          dangerouslySetInnerHTML={{ __html: code ?? "" }}
          className="relative flex-1 overflow-scroll after:absolute after:inset-y-0 after:left-0 after:w-5 after:bg-zinc-950 [&_.line:before]:sticky [&_.line:before]:left-2 [&_.line:before]:z-10 [&_.line:before]:translate-y-[-1px] [&_.line:before]:pr-1 [&_pre]:h-[--height] [&_pre]:overflow-auto [&_pre]:!bg-transparent [&_pre]:pb-20 [&_pre]:pt-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed"
        />
      </div>
      {preview
        ? <Preview />
        : ""}
    </div>
  );
}

export function BlockViewerFileTree({ treeData }: { treeData: Tree[] }) {
  // const { tree } = useBlockViewer();

  // if (!tree) {
  //   return null;
  // }

  return (
    <SidebarProvider className="flex !min-h-full flex-col">
      <Sidebar
        collapsible="none"
        className="w-full flex-1 border-r border-zinc-700 bg-zinc-900 text-white"
      >
        <SidebarGroupLabel className="h-12 rounded-none border-b border-zinc-700 px-4 text-sm text-white">
          Files
        </SidebarGroupLabel>
        <SidebarGroup className="p-0 overflow-scroll h-screen">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {treeData.map((file, index) => <Tree key={index} item={file} index={1} />)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </Sidebar>
    </SidebarProvider>
  );
}

function Tree({ item, index }: { item: FileTree; index: number }) {
  const { activeFile, setActiveFile } = useBlockViewer();

  if (!item.children) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          isActive={item.path === activeFile}
          onClick={() => item.path && setActiveFile(item.path)}
          className="whitespace-nowrap rounded-none pl-[--index] hover:bg-zinc-700 hover:text-white focus:bg-zinc-700 focus:text-white focus-visible:bg-zinc-700 focus-visible:text-white active:bg-zinc-700 active:text-white data-[active=true]:bg-zinc-700 data-[active=true]:text-white"
          data-index={index}
          style={{
            paddingLeft: `${index * (index === 2 ? 1.2 : 1.3)}rem`,
          } as React.CSSProperties}
        >
          <ChevronRight className="invisible" />
          <File className="h-4 w-4" />
          {item.name}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            className="whitespace-nowrap rounded-none hover:bg-zinc-700 hover:text-white focus-visible:bg-zinc-700 focus-visible:text-white active:bg-zinc-700 active:text-white data-[active=true]:bg-zinc-700 data-[active=true]:text-white data-[state=open]:hover:bg-zinc-700 data-[state=open]:hover:text-white"
            style={{
              paddingLeft: `${index * (index === 1 ? 1 : 1.3)}rem`,
            } as React.CSSProperties}
          >
            <ChevronRight className="h-4 w-4 transition-transform" />
            <Folder className="h-4 w-4" />
            {item.name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="m-0 w-full border-none p-0">
            {item.children.map((subItem, key) => <Tree key={key} item={subItem} index={index + 1} />)}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

function BlockCopyCodeButton() {
  const { activeFile, fileContent, item } = useBlockViewer();
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <Button
      onClick={() => {
        copyToClipboard(fileContent || "");
      }}
      className="h-7 w-7 shrink-0 rounded-lg p-0 hover:bg-zinc-700 hover:text-white focus:bg-zinc-700 focus:text-white focus-visible:bg-zinc-700 focus-visible:text-white active:bg-zinc-700 active:text-white data-[active=true]:bg-zinc-700 data-[active=true]:text-white [&>svg]:size-3"
      variant="ghost"
    >
      {isCopied ? <Check /> : <Clipboard />}
    </Button>
  );
}

function BlockViewer({
  item,
  tree,
  code,
  treeData,
  highlightedFiles,
  ...props
}: Pick<BlockViewerContext, "item" | "tree" | "highlightedFiles"> & { code: string; treeData: Tree[] }) {
  return (
    <BlockViewerProvider
      item={item}
      tree={tree}
      highlightedFiles={highlightedFiles}
      {...props}
    >
      <BlockViewerToolbar />
      <BlockViewerCode code={code} treeData={treeData} />
    </BlockViewerProvider>
  );
}

export { BlockViewer };
