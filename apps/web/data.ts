export const trees = [
  {
    name: "src",
    path: "/src",
    children: [
      { name: "index.ts", path: "/src/index.ts" },
      { name: "app.tsx", path: "/src/app.tsx" },
      {
        name: "components",
        path: "/src/components",
        children: [
          { name: "Header.tsx", path: "/src/components/Header.tsx" },
          { name: "Footer.tsx", path: "/src/components/Footer.tsx" },
          { name: "Button.tsx", path: "/src/components/Button.tsx" },
          { name: "Sidebar.tsx", path: "/src/components/Sidebar.tsx" },
          { name: "Card.tsx", path: "/src/components/Card.tsx" },
          { name: "Modal.tsx", path: "/src/components/Modal.tsx" },
          {
            name: "modals",
            path: "/src/components/modals",
            children: [
              { name: "LoginModal.tsx", path: "/src/components/modals/LoginModal.tsx" },
              { name: "SignupModal.tsx", path: "/src/components/modals/SignupModal.tsx" },
              { name: "DeleteConfirmModal.tsx", path: "/src/components/modals/DeleteConfirmModal.tsx" },
            ],
          },
        ],
      },
      {
        name: "hooks",
        path: "/src/hooks",
        children: [
          { name: "useAuth.ts", path: "/src/hooks/useAuth.ts" },
          { name: "useFetch.ts", path: "/src/hooks/useFetch.ts" },
          { name: "useDebounce.ts", path: "/src/hooks/useDebounce.ts" },
          { name: "useLocalStorage.ts", path: "/src/hooks/useLocalStorage.ts" },
        ],
      },
      {
        name: "utils",
        path: "/src/utils",
        children: [
          { name: "formatDate.ts", path: "/src/utils/formatDate.ts" },
          { name: "logger.ts", path: "/src/utils/logger.ts" },
          { name: "constants.ts", path: "/src/utils/constants.ts" },
        ],
      },
      {
        name: "services",
        path: "/src/services",
        children: [
          { name: "api.ts", path: "/src/services/api.ts" },
          { name: "authService.ts", path: "/src/services/authService.ts" },
          { name: "userService.ts", path: "/src/services/userService.ts" },
        ],
      },
      {
        name: "store",
        path: "/src/store",
        children: [
          { name: "index.ts", path: "/src/store/index.ts" },
          { name: "authSlice.ts", path: "/src/store/authSlice.ts" },
          { name: "userSlice.ts", path: "/src/store/userSlice.ts" },
        ],
      },
      {
        name: "routes",
        path: "/src/routes",
        children: [
          { name: "index.tsx", path: "/src/routes/index.tsx" },
          { name: "privateRoutes.tsx", path: "/src/routes/privateRoutes.tsx" },
          { name: "publicRoutes.tsx", path: "/src/routes/publicRoutes.tsx" },
        ],
      },
    ],
  },
  {
    name: "public",
    path: "/public",
    children: [
      { name: "index.html", path: "/public/index.html" },
      { name: "favicon.ico", path: "/public/favicon.ico" },
      { name: "manifest.json", path: "/public/manifest.json" },
      { name: "robots.txt", path: "/public/robots.txt" },
    ],
  },
  {
    name: "assets",
    path: "/assets",
    children: [
      { name: "logo.png", path: "/assets/logo.png" },
      { name: "background.jpg", path: "/assets/background.jpg" },
      {
        name: "icons",
        path: "/assets/icons",
        children: [
          { name: "icon-192.png", path: "/assets/icons/icon-192.png" },
          { name: "icon-512.png", path: "/assets/icons/icon-512.png" },
        ],
      },
    ],
  },
  {
    name: "config",
    path: "/config",
    children: [
      { name: "webpack.config.js", path: "/config/webpack.config.js" },
      { name: "tsconfig.json", path: "/config/tsconfig.json" },
      { name: "eslint.config.js", path: "/config/eslint.config.js" },
    ],
  },
  {
    name: "tests",
    path: "/tests",
    children: [
      { name: "App.test.ts", path: "/tests/App.test.ts" },
      { name: "Header.test.ts", path: "/tests/Header.test.ts" },
      { name: "utils.test.ts", path: "/tests/utils.test.ts" },
      { name: "authService.test.ts", path: "/tests/authService.test.ts" },
    ],
  },
  {
    name: "docs",
    path: "/docs",
    children: [
      { name: "getting-started.md", path: "/docs/getting-started.md" },
      { name: "api-reference.md", path: "/docs/api-reference.md" },
      { name: "deployment.md", path: "/docs/deployment.md" },
    ],
  },
  {
    name: "scripts",
    path: "/scripts",
    children: [
      { name: "build.sh", path: "/scripts/build.sh" },
      { name: "deploy.sh", path: "/scripts/deploy.sh" },
    ],
  },
  {
    name: ".github",
    path: "/.github",
    children: [
      {
        name: "workflows",
        path: "/.github/workflows",
        children: [
          { name: "ci.yml", path: "/.github/workflows/ci.yml" },
          { name: "cd.yml", path: "/.github/workflows/cd.yml" },
        ],
      },
    ],
  },
  { name: "package.json", path: "/package.json" },
  { name: "README.md", path: "/README.md" },
  { name: ".gitignore", path: "/.gitignore" },
  { name: ".eslintrc.js", path: "/.eslintrc.js" },
  { name: ".prettierrc", path: "/.prettierrc" },
  { name: "jest.config.js", path: "/jest.config.js" },
];
