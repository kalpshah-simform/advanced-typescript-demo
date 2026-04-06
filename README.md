# Advanced TypeScript + React

A comprehensive learning and reference project for advanced React patterns with TypeScript, featuring practical examples, state management with Redux, and in-depth TypeScript documentation.

## 🎯 Overview

This project demonstrates advanced TypeScript concepts within React applications, including:
- **React Patterns**: Hooks, Context API, Higher-Order Components
- **TypeScript Advanced Types**: Generics, mapped types, union/intersection, utility types, type guards, error handling
- **State Management**: Redux Toolkit integration with TypeScript
- **Real-world Examples**: Todos, API fetching, form handling with ref forwarding
- **Modern Tooling**: Vite for fast development builds, ESLint with type-aware rules

## ✨ Features

- ⚡ **Vite** - Lightning-fast build tool with HMR (Hot Module Replacement)
- 🔵 **React 19** - Latest React with concurrent features
- 📘 **TypeScript 5.9** - Strict type checking and advanced type features
- 🎛️ **Redux Toolkit** - Simplified state management
- 🪝 **Custom Hooks** - Reusable logic patterns
- 📚 **Documentation** - Comprehensive TypeScript guides in `/docs`
- ✅ **ESLint** - Type-aware and React-specific linting rules

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Run linting
pnpm run lint

# Preview production build
pnpm run preview
```

The app will be available at `http://localhost:5173` after running `dev`.

## 📁 Project Structure

```
src/
├── examples/                 # Practical component examples
│   ├── TodosComponent.tsx       # Redux-based todo list
│   ├── APIFetchComponent.tsx    # Async data fetching patterns
│   ├── TypescriptExampleComponent.tsx
│   ├── InputForwardRef.tsx      # Ref forwarding example
│   └── wrapperComponent.tsx     # HOC wrapper pattern
├── hooks/                    # Custom React hooks
│   └── useCounter.tsx           # Counter hook example
├── contexts/                 # React Context setup
│   └── counterContext.tsx       # Context with provider
├── redux/                    # Redux state management
│   ├── redux-store.ts           # Store configuration
│   └── todos/
│       └── todosSlice.ts        # Redux slice for todos
├── App.tsx                   # Main app component
├── main.tsx                  # Entry point
└── index.css                 # Global styles
```

## 📚 Documentation

Learn advanced TypeScript concepts from the `/docs` directory:

- **[generics.md](docs/generics.md)** - Generic types and constraints
- **[mapped-condition-types.md](docs/mapped-condition-types.md)** - Mapped and conditional types
- **[union-intersection.md](docs/union-intersection.md)** - Union and intersection types
- **[utility-types.md](docs/utility-types.md)** - TypeScript utility types (`Partial`, `Pick`, `Record`, etc.)
- **[type-narrow & type-guard.md](docs/type-narrow%20&%20type-guard.md)** - Type narrowing and guards
- **[error-handling.md](docs/error-handling.md)** - Error handling patterns

## 💻 Examples Overview

### TodosComponent
Redux-based todo management with add/delete/toggle operations.

### APIFetchComponent
Demonstrates async data fetching with loading/error states and proper TypeScript typing.

### TypescriptExampleComponent
Showcases advanced TypeScript patterns and utility types in practice.

### InputForwardRef
Example of using `forwardRef` to access DOM elements directly from parent components.

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm run dev` | Start dev server with HMR |
| `pnpm run build` | Build for production |
| `pnpm run lint` | Run ESLint with TypeScript checking |
| `pnpm run preview` | Preview production build locally |

## ⚙️ Tech Stack

- **React 19.2** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7** - Build tool
- **Redux Toolkit 2.11** - State management
- **React Redux 9.2** - React bindings for Redux
- **ESLint** - Code quality
- **Vite plugin-react** - React Fast Refresh

## 🔍 ESLint Configuration

The project uses type-aware ESLint rules for maximum type safety. See the [ESLint configuration expansion guide](#eslint-rules) below for using stricter rules.

### Enable Type-Aware Rules

To enable stricter type-aware linting rules, update `eslint.config.js`:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Use recommended-type-checked or strict-type-checked:
      tseslint.configs.recommendedTypeChecked,
      // For stricter rules, use:
      // tseslint.configs.strictTypeChecked,
      // For stylistic rules:
      // tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

### React-Specific ESLint Rules

For additional React and React DOM linting, install and add:

```bash
pnpm add -D eslint-plugin-react-x eslint-plugin-react-dom
```

Then update `eslint.config.js`:

```js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
  },
])
```

## 📝 React Compiler

The React Compiler is not enabled by default due to performance impact during development and build. To enable it, see the [React Compiler installation guide](https://react.dev/learn/react-compiler/installation).

## 🌐 Deployment

The project includes a `vercel.json` configuration for easy deployment to Vercel. Deploy with:

```bash
pnpm run build
# Then deploy the dist/ directory
```

## 📖 Learning Resources

This project is designed as a learning resource. Each example includes:
- TypeScript type definitions
- Comments explaining patterns
- Real-world use cases

Explore the components and docs to understand advanced React and TypeScript patterns in practice.
