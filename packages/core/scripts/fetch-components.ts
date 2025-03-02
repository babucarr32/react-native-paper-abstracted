import { cloneSpecificFolder } from "@react-native-paper-abstracted/cli/src/utils/git";
import path from "path";
import "colors";
import { remoteDirs } from "@react-native-paper-abstracted/cli/src/utils/constants";

const allDirs = remoteDirs.map(({ directory }) => directory).join(" ");
console.log({ allDirs });

export const fetchComponents = async () => {
  const outDir = path.join("src");
  const remoteComponentFolderPath = "src/core";
  await cloneSpecificFolder(outDir, remoteComponentFolderPath, "src/components src/utils src/styles");
};

fetchComponents();
