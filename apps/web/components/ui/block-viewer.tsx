"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Book, Code, File, Send, Check, Terminal, Clipboard, ChevronRight, Loader } from "lucide-react";
import { ImperativePanelHandle } from "react-resizable-panels";
// import { registryItemFileSchema, registryItemSchema } from "shadcn/registry";
import { z } from "zod";
import { ContentType, getContent } from "@/actions";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { highlightCode } from "@/libs";
import { TreeType } from "@/scripts";
import Docs from "../docs";
import { cn } from "../lib/utils";
import { usePostHog } from "posthog-js/react";
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
  activeFolder: string;
  preview?: boolean;
  fileContent?: string;
  hasClickedOnFolder: boolean;
  setFileContent: React.Dispatch<React.SetStateAction<string>>;
  setActiveFolder: React.Dispatch<React.SetStateAction<string>>;
  setHasClickedOnFolder: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [activeFolder, setActiveFolder] = React.useState("");
  const [hasClickedOnFolder, setHasClickedOnFolder] = React.useState(false);
  const [view, setView] = React.useState<BlockViewerContext["view"]>("preview");
  // const [style, setStyle] = React.useState<BlockViewerContext["style"]>("new-york");
  const [style, setStyle] = React.useState<BlockViewerContext["style"]>("");
  const [activeFile, setActiveFile] = React.useState<
    BlockViewerContext["activeFile"]
  >("__components__/components/ActivityIndicator/index.tsx");
  const resizablePanelRef = React.useRef<ImperativePanelHandle>(null);

  const togglePreview = () => {
    setPreview(!preview);
  };

  return (
    <BlockViewerContext.Provider
      value={{
        item,
        view,
        tree,
        style,
        setView,
        preview,
        setStyle,
        activeFile,
        fileContent,
        activeFolder,
        togglePreview,
        setActiveFile,
        setFileContent,
        setActiveFolder,
        highlightedFiles,
        hasClickedOnFolder,
        setHasClickedOnFolder,
        resizablePanelRef: resizablePanelRef as any,
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
  const posthog = usePostHog();
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
        <div className="flex items-center gap-1 rounded-xl border p-[2px]">
          <Button
            variant="ghost"
            className="hidden !h-9 w-auto gap-1 !rounded-xl px-2 md:flex lg:w-auto"
            onClick={() => {
              copyToClipboard(`npx rnpa add ${activeComponentName}`);
              posthog.capture("copy_code");
            }}
          >
            {isCopied ? <Check /> : <Terminal />}
            <span className="hidden lg:inline">npx rnpa add {activeComponentName}</span>
          </Button>
        </div>
        <div className="ml-4 flex gap-3">
          <Button
            variant={"outline"}
            onClick={() => {
              posthog.capture("visit_repo");
              togglePreview && togglePreview();
            }}
            className="h-10 rounded-xl"
          >
            <Eye />
            Preview
          </Button>
        </div>
      </div>
    </div>
  );
}

const Preview = () => {
  return (
    <div className="w-[400px]  border-l border-zinc-700 h-full">
      <div className="flex h-12 items-center border-b border-zinc-700 bg-zinc-900" />
      <div className="p-2 ">
        <Image src={"images/phone.png"} alt="Component image" height={900} width={400} // https://www.vecteezy.com/members/phanithi
        />
      </div>
    </div>
  );
};

const ConditionalLoadingRenderer = (
  { loading, Loader, children }: {
    loading: boolean | undefined;
    Loader?: () => React.JSX.Element;
    children: React.ReactNode;
  },
) => {
  if (loading) return Loader ? <Loader /> : "";

  return <>{children}</>;
};

const LoadingSpinner = () => (
  <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-fit h-fit animate-spin">
    <Loader />
  </div>
);

function BlockViewerCode({ treeData }: { code: string; treeData: TreeType[] }) {
  const posthog = usePostHog();
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const { activeFile, preview, activeFolder, setFileContent, hasClickedOnFolder } = useBlockViewer();
  const [cache, setCache] = React.useState<Map<string, ContentType>>(new Map());

  React.useEffect(() => {
    (async () => {
      if (activeFile && !hasClickedOnFolder) {
        // Get data from the cache if available
        const { content, raw } = cache.get(activeFile) || {};
        if (content && raw) {
          setCode(content);
          setCode(content as string);
          setLoading(false);
        } else {
          setLoading(true);
          getContent<undefined>(activeFile).then((result) => {
            const { raw, content } = result || {};
            setFileContent(raw as string);
            setCode(content as string);
            setLoading(false);
          }).catch((err) => {
            setLoading(false);
          });
        }
      } else {
        if (activeFolder) {
          getContent("", activeFolder).then((data) => {
            // Data might be {}
            if (Object.keys(data)) {
              setCache((prev) => {
                const newMap = new Map(prev);
                const entries = Object.entries(data);
                for (const [key, value] of entries) {
                  newMap.set(key, value);
                }
                return newMap;
              });
              setLoading(false);
            }
          }).catch((err) => {
            setLoading(false);
          });
        }
      }
    })();
  }, [activeFile, activeFolder, hasClickedOnFolder]);

  const currentFilePath = activeFile?.split("__/").pop();

  const componentName = activeFile?.split("/")[2]?.split(".")[0] || "";
  const activeComponentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

  return (
    <div className="mr-[14px] border-r border-b flex overflow-hidden rounded-xl bg-zinc-950 text-white group-data-[view=preview]/block-view-wrapper:hidden md:h-screen">
      <div className="w-[280px]">
        <BlockViewerFileTree treeData={treeData} />
      </div>
      <div className="relative flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 items-center gap-2 border-b border-zinc-700 bg-zinc-900 px-4 text-sm font-medium">
          <File className="size-4" />
          {currentFilePath}

          <Link
            onClick={() => posthog.capture("visit_component_docs")}
            href={`https://callstack.github.io/react-native-paper/docs/components/${activeComponentName}/`}
            target="_blank"
            className="ml-10 flex gap-2 items-center"
          >
            <Send className="size-4" />
            Docs for {componentName}
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <BlockCopyCodeButton />
          </div>
        </div>
        <ConditionalLoadingRenderer loading={loading} Loader={LoadingSpinner}>
          <div
            data-rehype-pretty-code-fragment
            dangerouslySetInnerHTML={{ __html: code ?? "" }}
            className="relative flex-1 overflow-scroll after:absolute after:inset-y-0 after:left-0 after:w-5 after:bg-zinc-950 [&_.line:before]:sticky [&_.line:before]:left-2 [&_.line:before]:z-10 [&_.line:before]:translate-y-[-1px] [&_.line:before]:pr-1 [&_pre]:h-[--height] [&_pre]:overflow-auto [&_pre]:!bg-transparent [&_pre]:pb-20 [&_pre]:pt-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed"
          />
        </ConditionalLoadingRenderer>
      </div>
      {preview
        ? <Preview />
        : ""}
    </div>
  );
}

export function BlockViewerFileTree({ treeData }: { treeData: TreeType[] }) {
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
            <SidebarMenu className="gap-1.5 mb-14">
              {treeData.map((file, index) => <Tree key={index} item={file} index={1} />)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </Sidebar>
    </SidebarProvider>
  );
}

const TSX = () => {
  return (
    <svg width="31" height="27" viewBox="0 0 31 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.5 15.6875C16.7081 15.6875 17.6875 14.7081 17.6875 13.5C17.6875 12.2919 16.7081 11.3125 15.5 11.3125C14.2919 11.3125 13.3125 12.2919 13.3125 13.5C13.3125 14.7081 14.2919 15.6875 15.5 15.6875Z"
        fill="#0077C6"
      />
      <path
        d="M29.7188 13.5C29.7188 14.0362 29.4698 14.6385 28.8306 15.2861C28.1868 15.9384 27.2012 16.576 25.8967 17.1351C23.2917 18.2515 19.6167 18.9688 15.5 18.9688C11.3833 18.9688 7.7083 18.2515 5.10327 17.1351C3.79882 16.576 2.81307 15.9384 2.16931 15.2861C1.53019 14.6385 1.28125 14.0362 1.28125 13.5C1.28125 12.9638 1.53019 12.3614 2.16931 11.7139C2.81307 11.0616 3.79882 10.424 5.10327 9.86492C7.7083 8.74849 11.3833 8.03125 15.5 8.03125C19.6167 8.03125 23.2917 8.74849 25.8967 9.86492C27.2012 10.424 28.1868 11.0616 28.8306 11.7139C29.4698 12.3614 29.7188 12.9638 29.7188 13.5Z"
        stroke="#0077C6"
      />
      <path
        d="M22.6094 25.8139C22.145 26.0819 21.499 26.1674 20.6186 25.9377C19.7318 25.7065 18.6867 25.1717 17.5503 24.3214C15.281 22.6237 12.8223 19.7996 10.764 16.2344C8.70562 12.6693 7.48926 9.12797 7.15361 6.31375C6.98555 4.90452 7.04483 3.73204 7.28786 2.84838C7.52912 1.9711 7.92628 1.45435 8.39067 1.18623C8.85505 0.91813 9.50115 0.832555 10.3815 1.06224C11.2683 1.29361 12.3134 1.8285 13.4497 2.67867C15.7191 4.37646 18.1778 7.20052 20.2362 10.7657C22.2944 14.3308 23.5109 17.8721 23.8464 20.6864C24.0144 22.0956 23.9552 23.2681 23.7121 24.1516C23.4709 25.029 23.0738 25.5457 22.6094 25.8139Z"
        stroke="#0077C6"
      />
      <path
        d="M8.39067 25.8139C7.92628 25.5457 7.52912 25.029 7.28786 24.1516C7.04483 23.2681 6.98555 22.0956 7.15361 20.6864C7.48926 17.8721 8.70562 14.3308 10.764 10.7657C12.8223 7.20052 15.281 4.37646 17.5503 2.67867C18.6867 1.8285 19.7318 1.29361 20.6186 1.06224C21.499 0.832555 22.145 0.91813 22.6094 1.18623C23.0738 1.45435 23.4709 1.9711 23.7121 2.84838C23.9552 3.73204 24.0144 4.90452 23.8464 6.31375C23.5109 9.12797 22.2944 12.6693 20.2362 16.2344C18.1778 19.7996 15.7191 22.6237 13.4497 24.3214C12.3134 25.1717 11.2683 25.7065 10.3815 25.9377C9.50113 26.1674 8.85505 26.0819 8.39067 25.8139Z"
        stroke="#0077C6"
      />
    </svg>
  );
};

const TS = () => {
  return (
    <svg width="28" height="19" viewBox="0 0 28 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23.0608 1.01578C23.9919 1.23239 24.838 1.71992 25.4922 2.41687C25.8527 2.79407 26.1656 3.2139 26.4241 3.66703C26.4362 3.71625 24.7463 4.85156 23.7215 5.48484C23.6843 5.51 23.5366 5.34922 23.3693 5.10203C23.1821 4.78022 22.9163 4.51111 22.5969 4.31984C22.2775 4.12857 21.9148 4.02138 21.5427 4.00828C20.3647 3.92734 19.6057 4.54422 19.6112 5.57562C19.601 5.82902 19.6588 6.08052 19.7785 6.30406C20.0377 6.84 20.519 7.16156 22.0305 7.81672C24.813 9.01438 26.0074 9.80406 26.7446 10.9263C27.1613 11.6353 27.4179 12.4269 27.4965 13.2455C27.5751 14.0642 27.4738 14.8901 27.1996 15.6655C26.8228 16.5158 26.2252 17.2497 25.469 17.7912C24.7127 18.3326 23.8254 18.6617 22.899 18.7444C21.9142 18.8573 20.9193 18.847 19.9371 18.7137C18.4326 18.4665 17.0467 17.7445 15.9821 16.6531C15.5798 16.2001 15.2393 15.6959 14.9693 15.1536C15.0828 15.0691 15.2023 14.9931 15.3269 14.9261C15.4997 14.8277 16.1538 14.4514 16.7707 14.0938L17.8907 13.4375L18.1247 13.7788C18.519 14.3425 19.0208 14.8228 19.6013 15.1919C20.1876 15.5135 20.8517 15.6658 21.5195 15.632C22.1874 15.5982 22.8327 15.3796 23.3835 15.0005C23.6676 14.7235 23.8453 14.3554 23.8852 13.9607C23.9252 13.5659 23.8251 13.1697 23.6022 12.8414C23.3004 12.4094 22.6835 12.0462 20.9302 11.2861C19.5554 10.8225 18.3032 10.0542 17.2673 9.03844C16.7739 8.47621 16.4095 7.81283 16.1998 7.09484C16.0446 6.27692 16.0217 5.4394 16.1319 4.61422C16.3378 3.66467 16.8305 2.80135 17.5434 2.14124C18.2564 1.48114 19.155 1.05616 20.1176 0.923906C21.0977 0.806783 22.0899 0.837754 23.0608 1.01578ZM13.9357 2.63781L13.9477 4.22812H8.88366V18.6087H5.31256V4.23141H0.2485V2.66953C0.235031 2.13465 0.249635 1.59944 0.292249 1.06609C0.310843 1.04094 3.38975 1.02891 7.12272 1.03547L13.916 1.05406L13.9357 2.63781Z"
        fill="#007ACC"
      />
    </svg>
  );
};

const FolderIcon = () => {
  return (
    <svg width="29" height="23" viewBox="0 0 29 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M26.0781 0.015625H15.9063L13.6094 4.60937H0.8125V22.9844H28.375V0.015625H26.0781ZM26.0781 4.60937H17.1094L18.3125 2.3125H26.0781V4.60937Z"
        fill="#C09553"
      />
    </svg>
  );
};
function Tree({ item, index }: { item: FileTree; index: number }) {
  const { activeFile, setActiveFile, setActiveFolder, setHasClickedOnFolder } = useBlockViewer();

  if (!item.children) {
    const isTSFile = item.path?.split(".").pop() === "ts";
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          isActive={item.path === activeFile}
          onClick={() => {
            item.path && setActiveFile(item.path);
            setHasClickedOnFolder(false);
          }}
          className="whitespace-nowrap rounded-none pl-[--index] hover:bg-zinc-700 hover:text-white focus:bg-zinc-700 focus:text-white focus-visible:bg-zinc-700 focus-visible:text-white active:bg-zinc-700 active:text-white data-[active=true]:bg-zinc-700 data-[active=true]:text-white"
          data-index={index}
          style={{
            paddingLeft: `${index * (index === 2 ? 1.2 : 1.3)}rem`,
          } as React.CSSProperties}
        >
          <ChevronRight className="invisible" />
          {isTSFile ? <TS /> : <TSX />}
          {item.name}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen={false}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            onClick={() => {
              setActiveFolder(item.path || "");
              setHasClickedOnFolder(true);
            }}
            className="whitespace-nowrap rounded-none hover:bg-zinc-700 hover:text-white focus-visible:bg-zinc-700 focus-visible:text-white active:bg-zinc-700 active:text-white data-[active=true]:bg-zinc-700 data-[active=true]:text-white data-[state=open]:hover:bg-zinc-700 data-[state=open]:hover:text-white"
            style={{
              paddingLeft: `${index * (index === 1 ? 1 : 1.3)}rem`,
            } as React.CSSProperties}
          >
            <ChevronRight className="h-4 w-4 transition-transform" />
            <FolderIcon />
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
  const posthog = usePostHog();
  const { activeFile, fileContent, item } = useBlockViewer();
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <Button
      onClick={() => {
        posthog.capture("copy_component");
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
  docs,
  treeData,
  highlightedFiles,
  ...props
}: Pick<BlockViewerContext, "item" | "tree" | "highlightedFiles"> & {
  code: string;
  docs: string;
  treeData: TreeType[];
}) {
  const posthog = usePostHog();
  const [current, setCurrent] = React.useState("docs");
  console.log({ current });
  return (
    <BlockViewerProvider
      item={item}
      tree={tree}
      highlightedFiles={highlightedFiles}
      {...props}
    >
      <Tabs onValueChange={setCurrent} value={current} defaultValue="docs" className="bg-transparent">
        <TabsList className="flex w-full  bg-transparent gap-3">
          <TabsTrigger value="docs" asChild>
            <Button
              onClick={() => posthog.capture("docs_tab")}
              variant={"outline"}
              className={cn("w-[100px] cursor-pointer h-10", current === "docs" && "!bg-accent")}
            >
              <Book />
              Docs
            </Button>
          </TabsTrigger>
          <TabsTrigger value="explorer" asChild>
            <Button
              variant={"outline"}
              onClick={() => posthog.capture("explorer_tab")}
              className={cn("w-[120px] cursor-pointer h-10", current === "explorer" && "!bg-accent")}
            >
              <Code />
              Explorer
            </Button>
          </TabsTrigger>
          <div className="flex-1 flex justify-end">
            <BlockViewerToolbar />
          </div>
        </TabsList>
        <TabsContent value="docs">
          <Docs data={docs} />
        </TabsContent>
        <TabsContent value="explorer">
          <BlockViewerCode code={code} treeData={treeData} />
        </TabsContent>
      </Tabs>
    </BlockViewerProvider>
  );
}

export { BlockViewer };
