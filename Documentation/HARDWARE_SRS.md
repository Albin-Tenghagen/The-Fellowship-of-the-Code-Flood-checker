# Requirement specification

## 1. Introduction

### 1.1 Product Scope

HydroGuard is a monitoring system designed to gather environmental data from natural water bodies and surrounding fields to support flood risk assessment and environmental monitoring. It provides real-time and periodic measurements of water levels, soil moisture, temperature, and humidity. The system consists of a set of sensor nodes, including a submersible pressure sensor and an ultrasonic water level sensor, that communicate via LoRa and route data to a backend server. Data is made accessible to municipalities through a mobile app. The system aims to improve early warning capabilities and data-driven water management strategies.

### 1.2 Target Audience

The target audience of the product is municipalities and the public which have an interest in monitoring waterlevels and risk of floods in certain areas.  

### 1.3 Intended Use

The product is intended to be partially placed on the rim of a lake such that the pressure sensor is under water and the ultrasound sensor above the surface of the lake. The product will then send data to a backend server which will then serve it to an app.

### 1.4 Table of Contents

- [Requirement specification](#requirement-specification)
  - [1. Introduction](#1-introduction)
    - [1.1 Product Scope](#11-product-scope)
    - [1.2 Target Audience](#12-target-audience)
    - [1.3 Intended Use](#13-intended-use)
    - [1.4 Table of Contents](#14-table-of-contents)
  - [2. System Requirements](#2-system-requirements)
    - [2.1 Functional Requirements](#21-functional-requirements)
    - [2.2 Non-Functional Requirements](#22-non-functional-requirements)
  - [3. System Architecture](#3-system-architecture)
    - [3.1 Overview](#31-overview)
    - [3.2 Data Flow](#32-data-flow)

## 2. System Requirements

### 2.1 Functional Requirements
The system shall:

- Read the pressure at the bottom of a water mass.
- Read the water level of a water mass.
- Read the soil moisture of a field.
- Read the temperature.
- Read the humidity.
- Calculate the average water level.
- Calculate the average water pressure.
- Calculate the distance from the ultrasonic device to the water level.
- Calculate the water level from the pressure sensor data.
- Send the gathered data to a router for database storage.
- Transmit pressure data from the microcontroller in the water to the microcontroller onshore using LoRa.
- One unit shall communicate with the router while the other router sends data to the first unit.
- If one of the water level sensors goes down, the other one still sends data. 
- The units shall use the 434.00 MHz band to communicate.

### 2.2 Non-Functional Requirements

The system shall: 

- Use secure, encrypted, communication protocols when communicating to the database
- be modular (make libraries)
- measure values from sensors every 30 minutes.
- measure the values from the water pressure sensor 50 times with 100 milliseconds in between the measuring points and then calculate an average value.  

## 3. System Architecture

### 3.1 Overview

The HydroGuard system is composed of:

- **Sensor Unit A** (submersible): Positioned at the rim of the water body.
- **Sensor Unit B** (base unit): Placed on land.
- **Communication Protocol**: LoRa-based wireless communication between sensor units.
- **Router**: Sends data to a cloud-based backend server.
- **Backend Server**: Processes, stores, and serves data through an app.

### 3.2 Data Flow

1. Sensor data is collected at fixed intervals.
2. Sensor data is transmitted via LoRa to a router.
3. Router forwards data to a cloud server using encrypted protocols.
4. Backend server processes data (e.g., averages, distance calculations).
5. Data is visualized and made available on an app dashboard.
