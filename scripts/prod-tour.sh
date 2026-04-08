#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$ROOT_DIR"
./gradlew :services:tour-service:build
java -jar services/tour-service/build/libs/tour-service-0.1-runner.jar