# GEMINI.md - Project Development Blueprint

This document provides a comprehensive overview of the `prj-dev-blueprint` project, its architecture, and development conventions. It is intended to be used as a guide for developers working on this project.

## Project Overview

This project is a modern monorepo configured with **Turbo Repo** and **Bun** for optimal build performance and developer experience. It contains two applications:

-   **`apps/web`**: A Next.js frontend application.
-   **`migration-back`**: A Vite-based React application for migration and blueprint features. This application uses Supabase for its backend. (To be removed later)

The project is set up to use TypeScript, ESLint, and Prettier to ensure code quality and consistency.

## Building and Running

The following commands are available at the root of the project:

-   **`bun install`**: Install dependencies for all workspaces.
-   **`bun dev`**: Run all apps in development mode.
-   **`bun build`**: Build all apps.
-   **`bun lint`**: Run linting across all apps.
-   **`bun type-check`**: Run type checking across all apps.
-   **`bun clean`**: Clean all build artifacts.
-   **`bun format`**: Format code with Prettier.
-   **`bun test`**: Run all tests (when implemented).

You can also run commands for specific apps by using the `--filter` flag with `turbo`. For example:

-   `bun turbo run dev --filter=web`
-   `bun turbo run dev --filter=migration-back`

## Development Conventions

-   **Code Style**: This project uses Prettier for code formatting. Please run `bun format` before committing your changes.
-   **Linting**: This project uses ESLint for static code analysis. Please run `bun lint` to check for any linting errors.
-   **Type Checking**: This project uses TypeScript. Please run `bun type-check` to check for any type errors.
-   **Commits**: Follow conventional commit standards for commit messages.
-   **Environment Variables**: Common environment variables can be set in `.env` files. See the `README.md` for a list of common variables.
