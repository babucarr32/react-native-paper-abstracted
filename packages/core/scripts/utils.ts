import { cloneSpecificFolder } from "@react-native-paper-abstracted/cli/src/utils/git";
import path from "path";
import "colors";

export const fetchComponents = async (outputDir: string, remoteComponentFolderPath: string, sparseDirs?: string) => {
  const outDir = path.join(outputDir);
  await cloneSpecificFolder(outDir, remoteComponentFolderPath, sparseDirs);
};
