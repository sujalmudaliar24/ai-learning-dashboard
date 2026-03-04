# Mini AI Learning Dashboard

A modern, responsive learning dashboard built with React (Vite), Redux Toolkit, and TailwindCSS.

## Features

- **Authentication Page**: A beautifully designed "mock" login screen allowing instant access with any credentials.
- **Dashboard Interface**: Displays courses loaded dynamically using Redux Thunks, complete with animated progress bars (0-100%).
- **Course Detail View**: Nested routing enabling toggling of individual lessons, which propagates visual progress to the state.
- **State Management**: Robust architecture powered by `@reduxjs/toolkit` managing queries, auth stat, and async course lists.
- **Theming via Context API**: Seamless global switching between light mode and a deep dark mode with dynamic accent colors (`#F59E0B` and `#1F2937`).
- **Responsive Animations**: Skeleton loading overlays that emulate real-world latency paired with modern micro-interactions (e.g. glowing gradients, scalable course tiles).
- **React Native Scaffold**: Included a standalone functional component (`react-native/DashboardScreen.tsx`) demonstrating how to leverage core React Native primitives (`View`, `Text`, `StyleSheet`) to build a visually cohesive mobile counterpart to the main web app.

## How to Run Locally

1. Make sure Node.js is installed.
2. Clone this repository down to your local machine.
3. Switch directories logically to `ai-learning-dashboard`.
4. Install dependencies: `npm install`
5. Run the dev server: `npm run dev`
6. Open your browser on `http://localhost:5173`.

## Architecture & Tools Used

- **Vite** with **React (JSX)** for blazing fast hot-reload capabilities.
- **TailwindCSS (v3 via PostCSS)** deployed with custom theme variable extensions.
- **Redux Toolkit** serving as the centralized action payload / state repository.
- **Lucide React** utilized for SVG-based adaptable icons mapped to the ThemeProvider.

## AI Tools Used

This project was built leveraging **Antigravity AI**, taking advantage of its autonomous multi-tool approach to set up projects, install sub-dependencies correctly in parallel, configure state management logically, and craft premium UI elements all based strictly on the core specifications. **Claude Sonnet 4.6** used for the creating and enhancing the UI 

## Challenges Faced

1. **TailwindCSS Intialization Environment Constraints**: Specifically executing `npx tailwindcss init -p` inside some subfolders spawned arbitrary internal module errors randomly. This was swiftly mitigated by directly writing valid commonJS files (`tailwind.config.js` and `postcss.config.js`) manually.
2. **Redux Reactivity across Routes**: Deeply tracking the nested lesson updates up onto the main card list progress bar necessitated precise state restructuring using Toolkit `reducers` explicitly acting on arrays stored globally instead of local isolated React component state.
3. **Light Mode Animation visibility**: In light mode, the animation is not visible as the background is white and the animation is also white. Had to try various colours to make it visible.

4. **Ai limits**: Faced difficulty while updatating the logic part related to redux as the AI credits were over on Day 1

## Deployment Link
- To be updated (Deployed on Vercel)
