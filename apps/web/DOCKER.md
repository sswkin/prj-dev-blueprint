# Docker Setup for Next.js Application

This directory contains Docker configuration files for containerizing the Next.js web application.

## Files Created

- `Dockerfile` - Multi-stage production Docker build
- `docker-compose.yml` - Docker Compose configuration
- `.dockerignore` - Files to exclude from Docker build context
- `next.config.ts` - Updated with Docker-optimized settings

## Quick Start

### Build and Run with Docker

```bash
# Build the Docker image
docker build -t nextjs-app .

# Run the container
docker run -p 3000:3000 nextjs-app
```

### Using Docker Compose

```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

## Dockerfile Features

### Multi-Stage Build
- **Base Stage**: Uses Node.js 18 Alpine for minimal size
- **Dependencies Stage**: Installs only production dependencies
- **Builder Stage**: Builds the Next.js application with optimizations
- **Runner Stage**: Creates a minimal production image

### Optimizations
- Uses Next.js standalone output for smaller final image
- Non-root user for security
- Health check included
- Optimized layer caching for faster rebuilds

### Security Features
- Runs as non-root user (nextjs:nodejs)
- Minimal attack surface with Alpine Linux
- No development tools in production image

## Configuration

### Environment Variables
The Docker setup includes these environment variables:
- `NODE_ENV=production` - Sets production mode
- `NEXT_TELEMETRY_DISABLED=1` - Disables Next.js telemetry
- `PORT=3000` - Application port
- `HOSTNAME=0.0.0.0` - Bind address

### Health Check
Includes a built-in health check that validates the application is responding correctly.

## Development Setup

For development, you can use the development override:

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

Note: This requires creating a `Dockerfile.dev` for development with hot reloading.

## Production Deployment

### Build for Production
```bash
docker build -t your-registry/nextjs-app:tag .
```

### Push to Registry
```bash
docker push your-registry/nextjs-app:tag
```

### Run in Production
```bash
docker run -d \
  --name nextjs-app \
  -p 3000:3000 \
  --restart unless-stopped \
  your-registry/nextjs-app:tag
```

## Troubleshooting

### Common Issues

1. **Build fails with permission errors**
   - Ensure Docker daemon is running
   - Check file permissions in the project

2. **Application won't start**
   - Check logs: `docker logs <container-id>`
   - Verify port 3000 is available
   - Check environment variables

3. **Slow builds**
   - Use `.dockerignore` to reduce build context
   - Enable BuildKit: `DOCKER_BUILDKIT=1 docker build`

### Debugging
```bash
# Access container shell
docker exec -it <container-id> sh

# View application logs
docker logs -f <container-id>

# Check container status
docker ps -a
```

## Performance Considerations

- Multi-stage builds reduce final image size
- Layer caching optimizes rebuild times
- Minimal dependencies in production image
- Non-root user for security

## Security Best Practices

- Application runs as non-root user
- Minimal Alpine Linux base image
- No unnecessary development tools
- Health check for monitoring