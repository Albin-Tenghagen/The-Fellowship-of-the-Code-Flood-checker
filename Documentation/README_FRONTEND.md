# Flood Checker Mobile App

A modern B2B mobile application for flood monitoring and prediction, developed as part of The Fellowship of the Code team for the Chas Challenge.

## Overview

The Flood Checker app provides real-time flood monitoring, risk assessment, and early warning capabilities for businesses and organizations. Built with a focus on reliability and user experience, it helps companies make informed decisions about flood-related risks.

## Features

- **Real-time Flood Monitoring**: Track current flood conditions in your area
- **Risk Assessment**: Evaluate flood risk levels for specific locations
- **Early Warning System**: Receive timely alerts about potential flooding
- **Historical Data**: Access historical flood data and trends
- **Interactive Maps**: Visualize flood zones and affected areas
- **B2B Dashboard**: Enterprise-focused interface for business users
- **Offline Capabilities**: Core functionality available without internet connection

## Technology Stack

- **Frontend**: React Native with Expo
- **Backend**: Node.js
- **Mobile Framework**: Expo
- **Maps**: Google Maps API / Mapbox
- **Weather Data**: OpenWeatherMap API
- **Push Notifications**: Firebase Cloud Messaging

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Expo Go app (for testing on device)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/edda177/The-Fellowship-of-the-Code-Flood-checker.git
   cd The-Fellowship-of-the-Code-Flood-checker/frontend-mobile
   ```

2. **Navigate to the mobile app directory**

   ```bash
   cd mobile-app/flood-app
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Run the application**

   Start the Expo development server:

   ```bash
   npx expo start
   ```

   This will open the Expo development tools in your browser. You can then:
   - Scan the QR code with the Expo Go app on your phone
   - Press 'i' to run on iOS simulator
   - Press 'a' to run on Android emulator
   - Press 'w' to run in web browser

## Usage

### For End Users

1. **Location Setup**: Allow location permissions for accurate flood monitoring
2. **Alert Configuration**: Set up notification preferences
3. **Monitor Dashboard**: View current flood status and risk levels
4. **Emergency Mode**: Access emergency contacts and evacuation routes

### For B2B Clients

1. **Organization Setup**: Configure your business locations
2. **Risk Management**: Set risk thresholds and alert criteria
3. **Reporting**: Generate flood risk reports for stakeholders
4. **API Integration**: Connect with existing business systems

## Project Structure

```
mobile-app/flood-app/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # App screens/pages
│   ├── services/           # API calls and external services
│   ├── utils/              # Helper functions
│   ├── assets/             # Images, fonts, etc.
│   └── navigation/         # Navigation configuration
├── app.json                # Expo configuration
├── package.json
└── README.md
```

## Testing

Run the test suite:

```bash
npm test
```

## API Documentation

The app connects to our flood monitoring backend API. Key endpoints include:

- `GET /api/flood-status` - Current flood status
- `GET /api/weather-data` - Weather information
- `POST /api/alerts` - Register for alerts
- `GET /api/historical-data` - Historical flood data

## Configuration

### Code Style

- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Write tests for new features

## Front-end Team

- **Sandra Hellvard**
- **Federica Misirocchi**

## Future Improvements

- Improve the map function adding info to API to fetch/post info
- Improve arbetsstatus to be able to send info to homescreen where private users can see how the status is going

 