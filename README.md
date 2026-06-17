# MonstarX - Vite + React + TypeScript Template

A modern, production-ready template for building React applications with Vite, TypeScript, and TailwindCSS.

## 🚀 Features

- ⚡️ **Vite** - Lightning fast build tool
- ⚛️ **React 18** - Latest React with hooks support
- 🔷 **TypeScript** - Type safety and better DX
- 🎨 **TailwindCSS** - Utility-first CSS framework
- 🎯 **Lucide React** - Beautiful, consistent icons
- 📦 **ESLint** - Code quality and consistency
- 🔥 **Hot Module Replacement** - Instant feedback during development

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## 🧹 Linting

Run ESLint:

```bash
npm run lint
```

## 📁 Project Structure

```
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   ├── index.css        # Global styles with Tailwind directives
│   └── vite-env.d.ts    # Vite type definitions
├── index.html           # HTML entry point
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # TailwindCSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## 🎨 Styling

This template uses TailwindCSS for styling. You can customize the theme in `tailwind.config.js`.

## 🔧 Configuration

### Vite

Configuration is in `vite.config.ts`. The template excludes `lucide-react` from optimization for better performance.

### TypeScript

TypeScript configuration is split into:
- `tsconfig.json` - Base configuration
- `tsconfig.app.json` - App-specific settings
- `tsconfig.node.json` - Node/build tool settings

## 📝 Template Guidelines

When building with this template:

- Create beautiful, production-worthy designs
- Use TailwindCSS for styling
- Use Lucide React for icons
- Use React hooks for state management
- Link to Unsplash for stock photos (don't download)
- Avoid installing additional UI libraries unless necessary

## 🤝 Contributing

This is a MonstarX template repository. For issues or suggestions, please contact the MonstarX team.

## 📄 License

MIT License - feel free to use this template for your projects.

---

**Built with MonstarX** 🚀
