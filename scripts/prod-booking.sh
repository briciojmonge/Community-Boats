#!/bin/bash
cd ../services/booking-service
./gradlew assemble
java -jar build/libs/booking-service-0.1-all.jar