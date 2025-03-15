import "colors";
import { fetchComponents } from "./utils";
import { REPO } from "@react-native-paper-abstracted/cli/src/utils/constants";

fetchComponents({
  repo: REPO,
  outputDir: "src",
  remoteComponentFolderPath: "src/core",
  unwantedFolders: ["src/components/scripts"],
  sparseDirs: "src/components src/utils src/styles src/types.tsx src/constants.tsx",
});
