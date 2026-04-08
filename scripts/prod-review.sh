#!/bin/bash
cd ../services/review-service
./gradlew assemble
java -jar build/libs/review-service-0.1-all.jar