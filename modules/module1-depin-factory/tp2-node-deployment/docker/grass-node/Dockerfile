FROM debian:slim

# Install dependencies for Xvfb and Chromium
RUN apt-get update && apt-get install -y \
    xvfb \
    chromium \
    chromium-driver \
    curl \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Set up working directory
WORKDIR /app

# Copy startup script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Environment variables for Grass
ENV GRASS_USER=""
ENV GRASS_PASS=""

ENTRYPOINT ["/app/entrypoint.sh"]
