import prompts, { PromptObject } from 'prompts';

interface PromptState {
  aborted: boolean
};

const enableTerminalCursor = () => {
  process.stdout.write('\x1B[?25h')
};

const onState = (state: PromptState) => {
  if (state.aborted) {
    // If we don't re-enable the terminal cursor before exiting
    // the program, the cursor will remain hidden
    enableTerminalCursor()
    process.stdout.write('\n')
    process.exit(1)
  };
};

const promptOverrideConfig: PromptObject<string>[] = [
  {
    type: 'toggle',
    name: 'overrideConfig',
    message: 'rnpaConfig.json file already exist, will you like to override?',
    initial: false,
    active: 'yes',
    inactive: 'no',
    onState
  },
];

const promptCreateRNPAConfig: PromptObject<string>[] = [
  {
    type: 'toggle',
    name: 'createConfigFile',
    message: 'Will you like to create a rnpaConfig.json file? ',
    initial: true,
    active: 'yes',
    inactive: 'no',
    onState
  },
];

const promptOutDir: PromptObject<string>[] = [
  {
    type: 'text',
    name: 'configOutDir',
    message: 'Which folder will you want to save components?',
    initial: 'components',
    onState
  },
  // {
  //   type: 'toggle',
  //   name: 'useImportAlias',
  //   message: 'WIll you like to use an import alias?',
  //   initial: true,
  //   active: 'yes',
  //   inactive: 'no'
  // },

];

// const promptUseImportAlias: PromptObject<string>[] = [
//   {
//     type: 'text',
//     name: 'importAlias',
//     message: 'What is your import alias',
//     initial: '@/components'
//   },
// ];

const questions: PromptObject<string>[] = [ 
  {
    type: 'number',
    name: 'age',
    message: 'How old are you?',
    onState
  },
  {
    type: 'text',
    name: 'about',
    message: 'Tell something about yourself',
    initial: 'Why should I?',
    onState
  }
];

type PromptReturnType = {
  importAlias?: string;
  configOutDir: string;
};

export const prompter = async (): Promise<PromptReturnType> => {
  let response: prompts.Answers<string> = {};

  const { configOutDir, useImportAlias} = await prompts(promptOutDir);
  return ({ ...response, configOutDir });

  // if (useImportAlias) {
  //   response = await prompts(promptUseImportAlias);
  // };

  // return ({ ...response, configOutDir: '' });
};

export const createConfigPrompter = async() => {
  const { createConfigFile }= await prompts(promptCreateRNPAConfig);
  return createConfigFile;
}

export const overrideConfigPrompter = async() => {
  const { overrideConfig }= await prompts(promptOverrideConfig);
  return overrideConfig;
}
