#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$ROOT_DIR"
./gradlew :services:review-service:build
java -jar services/review-service/build/libs/review-service-0.1-runner.jar