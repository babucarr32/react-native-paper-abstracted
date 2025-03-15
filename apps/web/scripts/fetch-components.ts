import { REPO_CORE } from "@react-native-paper-abstracted/cli/src/utils/constants";
import { fetchComponents } from "@react-native-paper-abstracted/core/fetch-components";

const main = async () => {
  // Fetch components
  await fetchComponents(
    {
      repo: REPO_CORE,
      outputDir: "__components__",
      remoteComponentFolderPath: "packages/core/src/core",
      sparseDirs:
        "packages/core/src/components packages/core/src/utils packages/core/src/styles packages/core/src/types.tsx packages/core/src/constants.tsx",
    },
  );
  // Fetch examples
  await fetchComponents({
    repo: REPO_CORE,
    outputDir: "__examples__",
    msg: "Fetching examples...",
    remoteComponentFolderPath: "packages/core/src/examples",
  });
};

main();
