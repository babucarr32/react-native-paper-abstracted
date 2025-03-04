import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  console.log({ components });
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => <h1 className="text-3xl font-bold mb-2">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold my-1 mt-2">{children}</h2>,
    h3: ({ children }) => <h3 className="font-bold">{children}</h3>,
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        {...(props as ImageProps)}
      />
    ),
    pre: ({ children }) => (
      <pre className="border dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-xl my-2 max-w-[700px] py-8">{children}</pre>
    ),
    ...components,
  };
}
