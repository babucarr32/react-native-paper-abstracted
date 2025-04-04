# React Native Paper Abstracted (RNPA)

## Introduction
React Native Paper Abstracted (RNPA) is a package that allows you to use only the components you need from [React Native Paper](https://reactnativepaper.com). This helps keep your app size small while providing endless customization options.

---

## Installation

### Using the CLI
The command-line interface (CLI) tool lets you set up and install components effortlessly.

```bash
npm install @react-native-paper-abstracted/cli
```

```bash
npx rnpa init
```

---

### Manual Installation
RNPA can be used without installing the CLI tool.

```bash
npm i @callstack/react-theme-provider color react-native-safe-area-context
```

Navigate to the **Explorer** tab and add the following folders/files to your project while maintaining the correct file structure:

- **/core**
- **/styles**
- **/utils**
- **/types.tsx**
- **/constants.tsx**

#### Non-Expo Projects
For non-Expo projects, install and link [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) (specifically, **MaterialCommunityIcons**):

```bash
npm install @react-native-vector-icons/material-icons
npm i @types/react-native-vector-icons
```

#### Expo Projects
If you use **Expo**, vector icons are already included. However, ensure your `babel.config.js` or `.babelrc` file (if they exist) includes `babel-preset-expo`:

**.babelrc**
```ts
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
};
```

**babel.config.js**
```ts
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
```

---

## How to Use

### Using the CLI

To initialize the project, run:
```bash
npx rnpa init
```

To add components, use the **add** command followed by the component name:
```bash
npx rnpa add <component-name>
```

You can find available components and their commands in the **Explorer** tab.

---

### Manual Usage

Visit the **Explorer** tab and copy the desired component.

---

Wrap your root layout with the **PaperProvider** component:

```ts
import { Stack } from 'expo-router';
import PaperProvider from '@/components/core/PaperProvider';

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}}/>
      </Stack>
    </PaperProvider>
  );
}
```

Now, you can import and use components as usual:

```ts
import * as React from 'react';
import Button from '@/components/Button/Button';
import { View } from 'react-native';

const HomeScreen = () => (
  <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
    <Button style={{ width: 'auto' }} mode="contained">
      Press me
    </Button>  
  </View>
);

export default HomeScreen;
```

