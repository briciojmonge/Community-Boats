# Community-Boats

## Ejercicio #6

### Santiago Calderón
### Fabricio Monge

A microservices-based boat tour platform with booking and review features, built with React and Micronaut.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Services](#services)
- [Development](#development)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)

## Overview

Community-Boats is a locally runnable microservices application that manages boat tours, user accounts, bookings, and reviews. The application uses:

- **Frontend**: React 18 with Vite and Tailwind CSS
- **Backend**: Micronaut-based REST microservices
- **Database**: H2 in-memory databases (development)
- **Authentication**: JWT (JSON Web Tokens)
- **Communication**: RESTful APIs with service-to-service communication

## Architecture

The application follows a microservices architecture with the following services:

```
┌─────────────┐
│   React     │
│  Frontend   │
│  (Port 5173)│
└──────┬──────┘
       │
   ┌───┴────────────────────────────────┐
   │                                    │
┌──▼──────┐  ┌──────────┐  ┌───────┐  ┌▼─────────┐
│  User   │  │   Tour   │  │Booking│  │ Review  │
│Service  │  │ Service  │  │Service│  │ Service │
│:8082    │  │ :8081    │  │ :8083 │  │  :8084  │
└─────────┘  └──────────┘  └───────┘  └─────────┘
```

Each service:
- Has its own H2 in-memory database
- Implements JWT-based authentication
- Communicates with other services via REST API calls
- Runs independently on different ports

## Prerequisites

### System Requirements
- **Java Development Kit (JDK)**: 17 or higher
- **Node.js**: 16 or higher
- **npm**: 8 or higher
- **Gradle**: 8 or higher (included via Gradle Wrapper)
- **Git**: Latest version

### Verify Installation
```bash
# Check Java version
java -version

# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

## Project Structure

```
Community-Boats/
├── README.md                          # This file
├── settings.gradle                    # Gradle root configuration
├── frontend/                          # React application
│   ├── src/
│   │   ├── components/               # React components
│   │   │   ├── Auth.jsx
│   │   │   ├── CreateTour.jsx
│   │   │   ├── MyBookings.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── TourList.jsx
│   │   ├── App.jsx                   # Main App component
│   │   ├── main.jsx                  # Entry point
│   │   └── index.css                 # Global styles
│   ├── index.html                    # HTML template
│   ├── package.json                  # npm dependencies
│   ├── vite.config.js                # Vite configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   └── postcss.config.js             # PostCSS configuration
│
├── services/                         # Microservices
│   ├── user-service/                # User management
│   │   ├── build.gradle
│   │   └── src/main/java/com/user/
│   │       ├── UserApplication.java
│   │       ├── controller/
│   │       ├── service/
│   │       ├── model/
│   │       ├── dto/
│   │       ├── repository/
│   │       └── security/
│   │
│   ├── tour-service/                # Tour management
│   │   ├── build.gradle
│   │   └── src/main/java/com/tour/
│   │
│   ├── booking-service/             # Booking management
│   │   ├── build.gradle
│   │   └── src/main/java/com/booking/
│   │
│   └── review-service/              # Review management
│       ├── build.gradle
│       └── src/main/java/com/review/
│
└── scripts/                          # Development helper scripts
    ├── dev-user.sh                   # Run user service
    ├── dev-tour.sh                   # Run tour service
    ├── dev-booking.sh                # Run booking service
    ├── dev-review.sh                 # Run review service
    ├── prod-user.sh                  # Production user service
    ├── prod-tour.sh                  # Production tour service
    ├── prod-booking.sh               # Production booking service
    └── prod-review.sh                # Production review service
```

## Installation

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/Community-Boats.git

# Navigate to the project directory
cd Community-Boats
```

### Step 2: Install Frontend Dependencies

```bash
# Navigate to frontend directory
cd frontend

# Install npm packages
npm install

# Return to root directory
cd ..
```

### Step 3: Build Backend Services

```bash
# Build all Gradle projects (from root directory)
./gradlew build

# Or on Windows
gradlew.bat build
```

This will:
- Download all Gradle dependencies
- Compile all microservices
- Run tests (if any)

## Running the Project

### Option 1: Using Development Scripts (Recommended)

The project includes convenient bash scripts to run each service:

#### Start All Services

Open 4 separate terminals (one for each service) and run:

**Terminal 1 - User Service (Port 8082)**
```bash
./scripts/dev-user.sh
```

**Terminal 2 - Tour Service (Port 8081)**
```bash
./scripts/dev-tour.sh
```

**Terminal 3 - Booking Service (Port 8083)**
```bash
./scripts/dev-booking.sh
```

**Terminal 4 - Review Service (Port 8084)**
```bash
./scripts/dev-review.sh
```

#### Start Frontend

Open another terminal and run:

```bash
cd frontend
npm run dev
```

The frontend will automatically open at `http://localhost:5173`

### Option 2: Running Services Manually

If you prefer not to use the scripts, run each microservice from the project root:

```bash
# User Service
./gradlew :services:user-service:run

# Tour Service
./gradlew :services:tour-service:run

# Booking Service
./gradlew :services:booking-service:run

# Review Service
./gradlew :services:review-service:run

# Frontend
cd frontend
npm run dev
```

### Option 3: Building for Production

```bash
# Build frontend
cd frontend
npm run build

# Output will be in frontend/dist/

# Build all services
cd ..
./gradlew build
```

## Services

### User Service
- **Port**: 8082
- **URL**: `http://localhost:8082`
- **Database**: H2 (in-memory: usersdb)
- **Responsibilities**: User registration, authentication, user profile management
- **Key Endpoints**:
  - `POST /users/register` - Register new user
  - `POST /users/login` - User login
  - `GET /users/{id}` - Get user details
  - `GET /users` - List users

### Tour Service
- **Port**: 8081
- **URL**: `http://localhost:8081`
- **Database**: H2 (in-memory: toursdb)
- **Responsibilities**: Tour creation, management, and listing
- **Key Endpoints**:
  - `GET /tours` - List all tours
  - `POST /tours` - Create new tour
  - `GET /tours/{id}` - Get tour details

### Booking Service
- **Port**: 8083
- **URL**: `http://localhost:8083`
- **Database**: H2 (in-memory: bookingsdb)
- **Responsibilities**: Booking management and reservations
- **Key Endpoints**:
  - `POST /bookings` - Create booking
  - `GET /bookings/{id}` - Get booking details
  - `GET /bookings/user/{userId}` - Get user's bookings

### Review Service
- **Port**: 8084
- **URL**: `http://localhost:8084`
- **Database**: H2 (in-memory: reviewsdb)
- **Responsibilities**: Review creation and listing
- **Key Endpoints**:
  - `POST /reviews` - Create review
  - `GET /reviews/tour/{tourId}` - Get tour reviews

## Development

### Frontend Development

```bash
cd frontend

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Development

Each microservice can be developed independently from the project root:

```bash
# Run one service
./gradlew :services:user-service:run

# Run tests for one service
./gradlew :services:user-service:test

# Build one service
./gradlew :services:user-service:build
```

### Making Changes

1. **Frontend**: Changes in `frontend/src/` automatically reload
2. **Backend**: Changes in service `src/` folders require service restart

### Database

- All services use H2 in-memory databases
- Data is persisted within the session
- Data is lost when services restart
- For persistent data, configure external databases in `application.yml`

## API Endpoints

### Authentication

Protected endpoints require a JWT token in the request header:

Authorization: Bearer <your_jwt_token>

Public endpoints such as `GET /tours` and `GET /tours/{id}` can be accessed without authentication.

### Example API Flow

```bash
# 1. Register user
curl -X POST http://localhost:8082/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123","role":"TOURIST","community":"Puntarenas"}'

# 2. Login
curl -X POST http://localhost:8082/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
# Response includes JWT token

# 3. List tours (public endpoint)
curl -X GET http://localhost:8081/tours

# 4. Create booking
curl -X POST http://localhost:8083/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt_token>" \
  -d '{"tourId":1}'

# 5. Create review
curl -X POST http://localhost:8084/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt_token>" \
  -d '{"bookingId":1,"rating":5,"comment":"Great experience!"}'
```

## 🐛 Troubleshooting

### Port Already in Use

If a port is already in use:

```bash
# Windows - Find and kill process on port
netstat -ano | findstr :8082
taskkill /PID <PID> /F

# macOS/Linux - Find and kill process on port
lsof -ti:8082 | xargs kill -9
```

### Gradle Build Issues

```bash
# Clean build
./gradlew clean build

# Rebuild dependencies
./gradlew build --refresh-dependencies

# Check gradle wrapper version
./gradlew --version
```

### Frontend Not Running

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules
npm install

# Run dev server
npm run dev
```

### Service Connection Issues

- Ensure all 4 backend services are running
- Check that ports 8081-8084 are not blocked by firewall
- Verify JWT tokens are correctly passed in headers
- Check logs in console for error messages

### Database Issues

- H2 databases are in-memory; data is lost on restart
- Check `application.yml` in each service for database configuration
- For permanent database, update JDBC URLs to point to external databases

### Hot Reload Not Working

- Frontend: Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
- Backend: Services need manual restart for code changes

## Notes

- Frontend runs on port `5173` by default.
- Backend services run on ports `8081` to `8084`.
- Service ports are configured in each microservice `application.yml`.
- H2 is used as a local in-memory database for development.