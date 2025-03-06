import "colors";
import path from "path";
import { cloneSpecificFolder } from "@react-native-paper-abstracted/cli/src/utils";

export const fetchComponents = async (outputDir: string, remoteComponentFolderPath: string, sparseDirs?: string) => {
  const outDir = path.join(outputDir);
  await cloneSpecificFolder(outDir, remoteComponentFolderPath, sparseDirs);
};
