# Welcome to our HydroGuard App 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Project description and features

This project is a HydroGuard app that helps businesses and organizations monitor real-time flood conditions and make informed decisions about flood-related risks.

## ✨ Features

- **🌊 Real-time Flood Monitoring**

  - Current flood conditions tracking
  - Risk assessment for specific locations
  - Early warning system
  - Historical flood data access

- **🗺️ Interactive Maps**

  - Visualize flood zones and affected areas
  - GPS location tracking
  - Interactive mapping features

- **🏢 B2B Experience**
  - Enterprise-focused dashboard
  - Organization setup and management
  - Risk management tools
  - Offline capabilities

## 🛠️ Tech Stack

- **Frontend**: React Native, Expo
- **Navigation**: React Navigation (Stack, Bottom Tabs, Native Stack)
- **Storage**: AsyncStorage, Expo Secure Store
- **Maps**: React Native Maps
- **Location**: Expo Location
- **Database**: Firebase
- **UI Components**: React Native Bouncy Checkbox
- **Updates**: Expo Updates (OTA)


## 🚀 Development Setup

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI
- Expo Go app (for testing on device)
- Android Studio (for Android development)
- Xcode (for iOS development)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/edda177/The-Fellowship-of-the-Code-Flood-checker.git
cd The-Fellowship-of-the-Code-Flood-checker/frontend-mobile

# Navigate to the mobile app directory
cd mobile-app/flood-app

# Install dependencies
npm install

# Start development server
npx expo start

# Choose your platform:
# Press 'a' for Android
# Press 'i' for iOS
# Press 'w' for web
```

## 📂 Project Structure

```
mobile-app/flood-app/
|- src/
│  |- components/         # Reusable UI components
│  |- screens/            # App screens/pages
│  |- services/           # API calls and external services
│  |- utils/              # Helper functions
│  |- assets/             # Images, fonts, etc.
│  └── navigation/        # Navigation configuration
|- app.json               # Expo configuration
|- package.json
└── README.md
```

## 🔮 Future Improvements

- Improve the map function adding info to API to fetch/post info
- Improve arbetsstatus to be able to send info to homescreen where private users can see how the status is going
- Add proper API with proper right data and not mockdata from firebase

## 👥 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/atfedmis">
        <img src="https://github.com/atfedmis.png" width="100px;" alt="atfedmis"/>
        <br />
        <sub><b>Federica Misirocchi</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/SandraWeronica">
        <img src="https://github.com/SandraWeronica.png" width="100px;" alt="SandraWeronica"/>
        <br />
        <sub><b>Sandra Hellvard</b></sub>
      </a>
    </td>
  </tr>
</table>
