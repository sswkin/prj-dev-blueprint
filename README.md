# prj-dev-blueprint

A modern monorepo configured with **Turbo Repo** and **Bun** for optimal build performance and developer experience.

## 🏗️ Monorepo Structure

This workspace contains multiple applications managed as a unified monorepo:

- **`apps/web`** - Next.js frontend application
- **`migration-back`** - Vite-based React application for migration and blueprint features

## ⚡ Quick Start

### Prerequisites

- **Bun** >= 1.2.5 (Install from [bun.sh](https://bun.sh))
- **Node.js** >= 18 (if not using Bun)

### Installation

```bash
# Install dependencies for all workspaces
bun install
```

### Development Commands

```bash
# Run all apps in development mode (parallel execution)
bun dev

# Run specific app in development mode
bun turbo run dev --filter=web
bun turbo run dev --filter=migration-back

# Run type checking across all apps
bun type-check

# Run linting across all apps
bun lint

# Clean all build artifacts
bun clean
```

### Build Commands

```bash
# Build all apps
bun build

# Build specific app
bun turbo run build --filter=web
bun turbo run build --filter=migration-back
```

### Other Commands

```bash
# Format code with Prettier
bun format

# Run all tests (when implemented)
bun test
```

## 🛠️ Turbo Configuration

This project uses **Turbo Repo** for:

- **Build Caching**: Automatic caching of build outputs for faster subsequent builds
- **Parallel Execution**: Parallel builds across multiple applications
- **Dependency Management**: Automatic workspace dependency resolution
- **Remote Caching**: Optional remote caching for team collaboration

### Available Turbo Tasks

- `dev` - Development servers (no caching, persistent)
- `build` - Production builds with caching
- `lint` - Code linting across all apps
- `type-check` - TypeScript type checking
- `clean` - Remove build artifacts
- `test` - Run tests (when implemented)

### Turbo Options

```bash
# Force rebuild (ignore cache)
turbo run build --force

# Dry run to see what would happen
turbo run build --dry-run

# Run specific apps only
turbo run build --filter=web

# Parallel execution
turbo run dev --parallel

# Generate build graph
turbo run build --graph
```

## 📦 Package Management

- **Package Manager**: Bun 1.2.5
- **Workspace Resolution**: Bun workspaces with Turbo dependency management
- **Lockfile**: `bun.lock` (automatically managed)

## 🔧 Development Workflow

1. **Install dependencies**: `bun install`
2. **Start development**: `bun dev`
3. **Make changes** in any app
4. **Build and test**: `bun build && bun lint && bun type-check`
5. **Format code**: `bun format`

## 🚀 Performance Optimizations

- **Build Caching**: Turbo automatically caches build outputs
- **Parallel Execution**: Multiple apps build simultaneously
- **Smart Dependency Management**: Only rebuilds what's necessary
- **Hot Reload**: Both apps support hot module replacement during development

## 📁 File Structure

```
.
├── package.json              # Root workspace configuration
├── turbo.json               # Turbo pipeline configuration
├── bun.lock                 # Bun lockfile
├── apps/
│   └── web/                 # Next.js application
├── migration-back/          # Vite React application
└── README.md               # This file
```

## 🌍 Environment Variables

Common environment variables that can be set:

```bash
NODE_ENV=development
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
```

## 📚 Framework-Specific Information

### Next.js App (`apps/web`)
- Framework: Next.js 16.0.1
- Build command: `next build`
- Dev command: `next dev`
- Output: `.next/` directory

### Vite App (`migration-back`)
- Framework: Vite with React 18
- Build command: `tsc && vite build`
- Dev command: `vite`
- Output: `dist/` directory

## 🤝 Contributing

1. Follow the existing code structure
2. Run `bun lint` and `bun type-check` before committing
3. Use `bun format` to format code
4. Test your changes with `bun build`

---

**Built with ❤️ using [Bun](https://bun.sh) and [Turbo Repo](https://turbo.build/)**
