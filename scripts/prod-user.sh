#!/bin/bash
cd ../services/user-service
./gradlew assemble
java -jar build/libs/user-service-0.1-all.jar