# Requirement specification

## 1. Introduction

### 1.1 Product Scope

### 1.2 Target Audience

The target audience of the product is municipalities which have an interest in monitoring waterlevels and risk of floods in certain areas.  

### 1.3 Intended Use

The product is intended to be partially placed on the rim of a lake such that the pressuresensor is under water and the ultrasound sensor above the surface of the lake. The product will then send data to a backend server which will then serve it to a website.  

### 1.4 Definitions and Abbreviations

### 1.5 Table of Contents

- [Requirement specification](#requirement-specification)
  - [1. Introduction](#1-introduction)
    - [1.1 Product Scope](#11-product-scope)
    - [1.2 Target Audience](#12-target-audience)
    - [1.3 Intended Use](#13-intended-use)
    - [1.4 Definitions and Abbreviations](#14-definitions-and-abbreviations)
    - [1.5 Table of Contents](#15-table-of-contents)
  - [2. System Requirements](#2-system-requirements)
    - [2.1 Functional Requirements](#21-functional-requirements)
    - [2.2 Non-Functional Requirements](#22-non-functional-requirements)
    - [2.3 Hardware Requirements](#23-hardware-requirements)
  - [3. External Interface Requirements](#3-external-interface-requirements)
    - [3.1 User Interface](#31-user-interface)
    - [3.2 Hardware Interface](#32-hardware-interface)
    - [3.3 Software Interface](#33-software-interface)

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

- Calculate the speed of sound from temperature and humidity.

- Calculate the distance from the ultrasonic device to the water level.

- Calculate the water level from the pressure sensor data.

- Send the gathered data to a router for database storage.

- Transmit pressure data from the microcontroller in the water to the microcontroller onshore using LoRa.

- Operate using solar panels and batteries for continuous operation.

### 2.2 Non-Functional Requirements

### 2.3 Hardware Requirements

## 3. External Interface Requirements

### 3.1 User Interface

### 3.2 Hardware Interface

### 3.3 Software Interface
