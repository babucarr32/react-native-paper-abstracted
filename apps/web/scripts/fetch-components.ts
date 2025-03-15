import { fetchComponents } from "@react-native-paper-abstracted/core/fetch-components";

const main = async () => {
  // Fetch components
  await fetchComponents(
    "__components__",
    "src/core",
    "src/components src/utils src/styles src/types.tsx src/constants.tsx",
  );
  // Fetch examples
  await fetchComponents("__examples__", "src/examples", "", "Fetching examples...");
};

main();
