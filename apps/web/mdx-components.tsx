import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import { CopyButton } from "./components/ui/copy-button";

type PropType = any;

export const mdxComponents = {
  // Allows customizing built-in components, e.g. to add styling.
  h1: ({ children }: PropType) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
  h2: ({ children }: PropType) => <h2 className="text-2xl font-bold mt-2">{children}</h2>,
  h3: ({ children }: PropType) => <h3 className="font-bold my-3">{children}</h3>,
  h4: ({ children }: PropType) => <h4 className="font-bold my-4 mt-6">{children}</h4>,
  hr: () => <hr className="my-3" />,
  p: ({ children }: PropType) => <p className="my-5">{children}</p>,
  a: ({ children, href }: PropType & { href: string }) => <a href={href} className="text-blue-500">{children}</a>,
  ul: ({ children }: PropType) => <ul className="my-4">{children}</ul>,
  li: ({ children }: PropType) => <li className="my-2">{children}</li>,
  img: (props: any) => (
    <Image
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
      {...(props as ImageProps)}
    />
  ),
  pre: ({ children, __rawString__ }: PropType) => {
    return (
      <div className="relative my-2 max-w-[700px] ">
        <CopyButton text={__rawString__} />
        <pre
          style={{
            fontFamily: "var(--font-geist-mono)",
          }}
          className="relative border dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-xl py-16"
        >
        {children}
        </pre>
      </div>
    );
  },
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
