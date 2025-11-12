# Use specific Node.js version for better caching and reproducibility
FROM node:20.11-alpine AS base

# Install dependencies in a single layer and enable corepack
RUN apk add --no-cache libc6-compat \
    && corepack enable \
    && corepack prepare pnpm@9.12.0 --activate

# Set working directory early
WORKDIR /app

# Dependencies stage - optimized for caching
FROM base AS deps

# Copy lock file first for better caching
COPY package.json ./

# Install dependencies with optimizations
RUN pnpm install --no-frozen-lockfile --prefer-offline

# Builder stage
FROM base AS builder

# Copy dependencies from previous stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source files (order matters for caching)
COPY package.json next.config.ts tsconfig.json postcss.config.mjs ./
COPY app ./app
COPY public ./public

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV SKIP_ENV_VALIDATION=1

# Build the application
RUN pnpm run build

# Runner stage - minimal production image
FROM node:20.11-alpine AS runner

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create nextjs user and group in a single layer
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy built application with proper ownership
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Use dumb-init for proper signal handling
CMD ["dumb-init", "node", "server.js"]