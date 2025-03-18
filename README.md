![React Native Paper Logo](/assets/images/rnpa-large.png)
# React Native Paper Abstracted (RNPA)

## Introduction
React Native Paper Abstracted (RNPA) is a package that allows you to use only the components you need from [React Native Paper](https://reactnativepaper.com). This helps keep your app size small while providing endless customization options.

### Apps and Packages

- `web`: [React Native Paper Abstracted](https://react-native-paper-abstracted.vercel.app)
- `@react-native-paper-abstracted/cli`: [React Native Paper Abstracted CLI](https://www.npmjs.com/package/@react-native-paper-abstracted/cli)

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```bash
cd react-native-paper-abstracted
npm run build
```

### Develop

To develop the web, run the following command:

```bash
cd react-native-paper-abstracted
npm run dev --workspace=web
```

To develop the CLI, run the following command:

```bash
cd react-native-paper-abstracted
npm run dev:watch --workspace=react-native-paper-abstracted/cli
```

Run the following command from a different tab:

```bash
npm run dev --workspace=@react-native-paper-abstracted/cli
```

## Contributions are highly welcomed 😉
