/**
 * @typedef {import('next').NextConfig} NextConfig
 * @typedef {Array<((config: NextConfig) => NextConfig)>} NextConfigPlugins
 */
import nextMDX from "@next/mdx";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { withContentlayer } from "next-contentlayer";

/** @type {NextConfigPlugins} */
const plugins = [];

/** @type {NextConfig} */
const nextConfig = {
  // output: "export",
  cleanDistDir: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
  outputFileTracingIncludes: {
    // This will include the __components__ folder for all pages
    "/**/*": ["./__components__/**/*"],
  },
};

/** @type {import('rehype-pretty-code').Options} */
const options = {
  keepBackground: false,
};

plugins.push(
  nextMDX({
    extension: /\.(md|mdx)$/,
    // experimental: {
    //   mdRs: true,
    // },
    options: {
      remarkPlugins: [],
      rehypePlugins: [[rehypePrettyCode, options], rehypeSlug],
    },
  }),
);

export default () => plugins.reduce((_, plugin) => plugin(_), withContentlayer(nextConfig));
