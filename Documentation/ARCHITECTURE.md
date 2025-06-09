# Software Architecture

Currently we only have documentation from embedded side of things. Needs to be completed.

# 1. Introductions and Goals

The purpose of this document is to describe the architecture of this project. Detailing its architecture, components and design.

The goals of the architecture is:

- Make the project easy to expand upon
- Make the project easy to debug
- Utilize most of hardware capabilities

# 2. Constraints

Technical constraints include: 

- Develop and program IoT-sensors, using kommunications such as for example: WiFi, Zigbee or LoRaWan. 
- The embedded systems must be optimized for powerusage and security.
- There must be communication between a backend and the embedded sensors.
- Backend must use Node.js, Express and SQL.
- Project must use secure authentication.
- Frontend must be implemented using React Native.
- Frontend must have a dashboard with datavisualization.

The system must also be GDPR compliant.

# 3. Context and Scope

The users interact with a frontend application and displays data which is fetched from backend. Backend in turn gets data from the sensors which periodically posts the data into the database.

This document only covers the frontend, backend and embedded devices.

# 4. Solution strategy

- The embedded devices (Heltec LoRa 32 V3) have their own framework and have some predetermined hardware requirements, such as the SX1262. 
- For the embedded side of the project we chose to constrain ourselves to procedural programming since it is more memory efficient.

Key technologies:

- Frontend: React-Native
- Backend: NodeJS, ExpressJS, and SQL
- Embedded: Arduino, ESP32

# 5. Building Block View

**High-Level Components:**

- Frontend Application: User interface for viewing collected data and showing user-submitted information.
- Backend API: Serves and modifies relevant data. Also handles login and database queries.
- Database: Stores user data, product information, and order history.
- Embedded: Collects and sends sensor data periodically to backend.

