import "colors";
import path from "path";
import fileSystem from "fs";
import { Project, SourceFile, StringLiteral } from "ts-morph";
import { cloneSpecificFolder } from "@react-native-paper-abstracted/cli/src/utils";

export const fetchComponents = async (
  outputDir: string,
  remoteComponentFolderPath: string,
  sparseDirs?: string,
  msg?: string,
) => {
  const outDir = path.join(outputDir);
  await cloneSpecificFolder(outDir, remoteComponentFolderPath, sparseDirs, msg);
};

const project = new Project();

export const getModuleSpecifier = (sourceFile: SourceFile | undefined) => {
  const imports = sourceFile?.getImportDeclarations() || [];
  return imports.map((i) => i.getModuleSpecifier());
};

const updateImport = (
  {
    moduleSpecifiers,
  }: {
    moduleSpecifiers: StringLiteral[];
  },
) => {
  for (const s of moduleSpecifiers) {
    const literal = s.getLiteralValue();

    if (literal.includes("..")) {
      const newImport = "@/components" + literal.split("..").pop();
      s.setLiteralValue(newImport);
    }
  }
};

// Change imports to @/components/foo/bar
export const updateExamplesImport = async () => {
  const DIR = "src/examples";
  const dirs = fileSystem.readdirSync(DIR);
  for (const dir of dirs) {
    const compPath = path.join(DIR, dir);

    if (fileSystem.lstatSync(compPath).isFile()) {
      project.addSourceFileAtPath(compPath);
      const sourceFile = project.getSourceFile(compPath);
      // Get import statements
      const moduleSpecifiers = getModuleSpecifier(sourceFile);
      updateImport({ moduleSpecifiers });
      await sourceFile?.save();
    }
  }
};
