#!/bin/bash
cd ../services/tour-service
./gradlew assemble
java -jar build/libs/tour-service-0.1-all.jar