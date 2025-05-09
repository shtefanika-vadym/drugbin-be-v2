#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Docker test script...${NC}"

# Build the Docker image
echo -e "${GREEN}Building Docker image...${NC}"
docker build -t drugbin-be-v2 .

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Docker image built successfully!${NC}"
else
    echo -e "${RED}Docker build failed!${NC}"
    exit 1
fi

# Stop any existing container with the same name
echo -e "${GREEN}Cleaning up any existing containers...${NC}"
docker stop drugbin-be-v2-container 2>/dev/null || true
docker rm drugbin-be-v2-container 2>/dev/null || true

# Run the container
echo -e "${GREEN}Starting the container...${NC}"
docker run -d --name drugbin-be-v2-container -p 3001:3001 drugbin-be-v2

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Container started successfully!${NC}"
else
    echo -e "${RED}Failed to start container!${NC}"
    exit 1
fi

# Wait for the server to start (10 seconds)
echo -e "${GREEN}Waiting for server to start...${NC}"
sleep 10

# Test the server
echo -e "${GREEN}Testing server response...${NC}"
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001)

if [ "$response" = "200" ]; then
    echo -e "${GREEN}Server is running and responding!${NC}"
else
    echo -e "${RED}Server test failed! Response code: $response${NC}"
    echo -e "${GREEN}Checking container logs...${NC}"
    docker logs drugbin-be-v2-container
    exit 1
fi

echo -e "${GREEN}All tests completed successfully!${NC}"
echo -e "${GREEN}To stop the container, run: docker stop drugbin-be-v2-container${NC}"
