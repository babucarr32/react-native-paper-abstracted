import "colors";
import path from "path";
import fs from "fs-extra";
import pc from "picocolors";
import { createTwoFilesPatch } from "diff";
import { cloneSpecificFolder } from "@react-native-paper-abstracted/cli/src/utils/git";
import { remoteDirs } from "@react-native-paper-abstracted/cli/src/utils/constants";

const REMOTE_COMPONENTS = "__remote_components__";
const PATCH_DIR = "__patch__";

const allDirs = remoteDirs.map(({ directory }) => directory).join(" ");

const generatePatchFilePath = (...args: string[]) => {
  return args.join(":").replace(/\//g, ":");
};

const diff = async () => {
  let patchPath = "";
  let outDir = "";
  let remoteComponentFolderPath = "";

  let isDiff = false;
  const diffs: string[] = [];

  for (let { directory, clone } of remoteDirs) {
    patchPath = path.join("src", PATCH_DIR);
    outDir = path.join("src", REMOTE_COMPONENTS, "src");
    remoteComponentFolderPath = directory;

    if (clone) {
      // Fetch components from remote source
      await cloneSpecificFolder(path.join(outDir), remoteComponentFolderPath, allDirs);
    }

    const currentComponentsPath = path.join(process.cwd(), directory);

    const newRemoteComponentsPath = path.join(process.cwd(), "src", REMOTE_COMPONENTS, directory);
    const newRemoteComponentsFileNames = fs.readdirSync(newRemoteComponentsPath, { encoding: "utf8", recursive: true });

    for (const fileName of newRemoteComponentsFileNames) {
      const currentComponentContentPath = path.join(currentComponentsPath, fileName);
      const remoteComponentContentPath = path.join(newRemoteComponentsPath, fileName);

      if (fs.lstatSync(remoteComponentContentPath).isFile()) {
        // A new component might be added to remote repo that is not available locally
        let currentComponentContent = "";
        if (fs.existsSync(currentComponentContentPath)) {
          currentComponentContent = fs.readFileSync(currentComponentContentPath).toString();
        }
        const remoteComponentContent = fs.readFileSync(remoteComponentContentPath).toString();

        // Save patch
        const patch = createTwoFilesPatch(
          currentComponentContentPath,
          remoteComponentContentPath,
          currentComponentContent,
          remoteComponentContent,
        );

        fs.mkdirpSync(path.join(patchPath));

        // If files content has changed write patch to file.
        // Because currentComponentContentPath and newRemoteComponentsPath are of different path
        // So comparing them produces a diff
        // To avoid that I used this approach

        const numLines = patch.split("\n").length;
        if (numLines > 4) {
          // Path for patch A/B/C.tsx becomes A:B:C.tsx to avoid creating sub-directories
          const patchFilePath = path.join(
            patchPath,
            `${generatePatchFilePath(REMOTE_COMPONENTS, directory, fileName)}.patch`,
          );
          fs.writeFileSync(patchFilePath, patch);
          isDiff = true;
          diffs.push(patchFilePath);
        }
      }
    }
  }

  if (!isDiff) {
    console.log(pc.cyan(`${pc.bold("No diffs found...")}`));
  } else {
    // Display diff file(s)
    console.log(pc.red(`${pc.bold("Diff(s) found")}`));
    diffs.forEach((f) => {
      console.log(pc.red(`${pc.bold("Diff: ")}${f}`));
    });
  }
};

diff();
