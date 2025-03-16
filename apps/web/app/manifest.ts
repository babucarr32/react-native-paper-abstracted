import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "React Native Paper Abstracted",
    short_name: "React Native Paper Abstracted",
    description:
      "React Native Paper Abstracted (RNPA) is a package that allows you to use only the components you need from [React Native Paper](https://reactnativepaper.com). This helps keep your app size small while providing endless customization options.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
