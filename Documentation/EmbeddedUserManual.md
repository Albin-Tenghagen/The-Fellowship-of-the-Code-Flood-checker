# User Manual

This application is designed to monitor environmental parameters using various sensors and transmit the data via LoRa and WiFi. The server side of the application is responsible for initializing the sensors, reading their values, and sending the collected data to a specified endpoint.  

## Requirements

Before setting up the server side application, ensure you have the following:  
Two Heltec LoRa 32 V3 boards compatible with the libraries used.  

### Required equipment:

- Soil moisture sensor (YL-69)  
- Ultrasonic distance sensor (HC-SR04)  
- Temperature and humidity sensor (DHT11)  
- Water pressure sensor TL-136  
- GERUI DC-DC Step Up Boost Converter 
- Breadboards   
- Different types of Resistors  
- Wires  

### Required software:

VS Code installed on your computer  
PlatformIO installed on your computer  

- [User Manual](#user-manual)
  - [Requirements](#requirements)
    - [Required equipment:](#required-equipment)
    - [Required software:](#required-software)
  - [Setup Process](#setup-process)
    - [Step 1: Setting up the hardware](#step-1-setting-up-the-hardware)
      - [**Hardware Connections**](#hardware-connections)
        - [MCU nr. 1:](#mcu-nr-1)
          - [Soil Moisture Sensor](#soil-moisture-sensor)
          - [Ultrasonic Distance Sensor (HC-SR04)](#ultrasonic-distance-sensor-hc-sr04)
          - [DHT11 Sensor](#dht11-sensor)
        - [MCU nr. 2:](#mcu-nr-2)
    - [Step 2: Installation of required tools](#step-2-installation-of-required-tools)
      - [Software Installation](#software-installation)
    - [Step 3: Cloning the repository](#step-3-cloning-the-repository)
      - [Modify WiFi Credentials:](#modify-wifi-credentials)
      - [Adjust Sensor Pins (if necessary):](#adjust-sensor-pins-if-necessary)
      - [Calibrating the TL-136](#calibrating-the-tl-136)
      - [Calibrating Soil moisture sensor (YL-69)](#calibrating-soil-moisture-sensor-yl-69)
    - [Step 4:](#step-4)
      - [Upload the Code:](#upload-the-code)
    - [Step 5:](#step-5)
      - [Monitor Serial Output](#monitor-serial-output)
        - [Open Serial Monitor (using VS-Code):](#open-serial-monitor-using-vs-code)
        - [Open Serial Monitor (using PlatformIO terminal interface):](#open-serial-monitor-using-platformio-terminal-interface)
        - [Validate sensor states:](#validate-sensor-states)
    - [Step 6:](#step-6)
  - [Troubleshooting](#troubleshooting)
  - [Appendix:](#appendix)


## Setup Process

### Step 1: Setting up the hardware  

#### **Hardware Connections**  

Connect the Sensors according to the circuit diagram:  
##### MCU nr. 1:  

###### Soil Moisture Sensor

Connect analog A0 sensorpin to pin 4 on Heltec and VCC sensorpin to pin 5 on Heltec. Connect GND on sensor to GND on Heltec. We don’t need to plug in the D0 pin because we don’t use that functionality. Because of this we don’t need to adjust the potentiometer either.   

Alternatively don’t use the module with the potentiometer and wire the sensor as follow: plug one of the wires of the sensor to GND on the Heltec. The other wire from the sensor is plugged through a 10K ohms resistor to pin 5 (digital pin that we use as VCC for this sensor) on the Heltec. The pin that reads the analog value is connected between the resistor and the VCC/pin 5 wire. The wire goes to pin 4 on the Heltec.    

###### Ultrasonic Distance Sensor (HC-SR04)

Connect the trigger pin on the sensor to pin 6 on Heltec and the echo pin on the sensor to pin 7 on Heltec. Connect VCC on sensor to VCC 5V on Heltec. Connect GND on sensor to GND on Heltec. 
DHT Sensor: Connect data on sensor to pin 8 on Heltec. Connect VCC on sensor to VCC 5V or VCC 3,3V on Heltec. Connect GND on sensor to GND on Heltec.  

###### DHT11 Sensor  

Connect data on sensor to pin 8 on Heltec. Connect VCC on sensor to VCC 5V or VCC 3,3V on Heltec. Connect GND on sensor to GND on Heltec.  

##### MCU nr. 2:

**Water pressure sensor:** Connect the red wire to Vout+ on the boost converter and blue wire to 110 Ohms of resistors. Connect those resistors to Vout- on the boost converter. Connect pin Vin+ to VCC 3.3V and Vin- to ground, then adjust the potentiometer until the converter outputs 24V. Connect a signal wire to a point between the 110 Ohms and the TL-136, then connect that wire to pin 7 on the Heltec.

Power on the Heltec board:  
Ensure the Heltec is powered through USB or an external power source.  

### Step 2: Installation of required tools

#### Software Installation  

Install PlatformIO if you don't already have it installed:  
Download and install the PlatformIO extension in VS Code.

To install PlatformIO IDE (Visual Studio Code extension) please refer to this [website](https://platformio.org/install).

### Step 3: Cloning the repository

**Clone the repository:** [The-Fellowship-of-the-code-Flood-Checker](https://github.com/Albin-Tenghagen/The-Fellowship-of-the-Code-Flood-checker/)  

```bash
git clone https://github.com/Albin-Tenghagen/The-Fellowship-of-the-Code-Flood-checker/
```

- Enter the repository and open the `embedded-systems` folder in VS-Code.  

```bash
cd The-Fellowship-of-the-Code-Flood-checker/embedded-systems
```

#### Modify WiFi Credentials: 

For the project to be able to build you must create a secrets.h file, preferably in `embedded-systems/lib` and define the file will look like the following:

```cpp
#ifndef SECRETS_H
#define SECRETS_H

// Your WiFi credentials
#define SSID                    "wifi_ssid"
#define PASSPHRASE              "wifi_password"

// These is used for logging into your server.
#define BACKEND_EMAIL           "youremail@domain.topdomain"
#define BACKEND_USERNAME        "backend_username"
#define BACKEND_PASSWORD        "backend_password" 

#endif
```

Ensure that the WiFi credentials (SSID and password) are defined in secrets.h, which should not be included in version control. Otherwise it could lead to your information being compromised.

#### Adjust Sensor Pins (if necessary): 

To change which pins are being used by which sensor the pin numbers can be updated in [`embedded-systems/include/config.h`](/embedded-systems/include/config.h).

#### Calibrating the TL-136  

If the depth readings are off, start by recording the raw values, given in the Serial monitor, above the surface, and 2 m down, accordingly, then enter those end values into the [config.h](/embedded-systems/include/config.h) file (`WATER_SENSOR_VALUE_AT_2m` and `WATER_SENSOR_VALUE_AT_0m`) and then try to measure depth again. If the reading are still off, set the correction factor to one (`WATER_SENSOR_CORRECTION_VALUE`, in the [config.h](/embedded-systems/include/config.h) file), and measure at a known depth, for example 1 m, then divide the actual depth (in cm) with the depth given in the monitor, and finally, set `WATER_SENSOR_CORRECTION_VALUE` to the result of your calculation.

#### Calibrating Soil moisture sensor (YL-69)

If necessary to get accurate readings, different soil types gives different values. Start by prepare soil samples from the location where the sensor is to be placed, where one sample is completely dry and another which is saturated to the maximum with moisture. See appendix on how to accomplish this. 

Put the soil sensor in the completely dried sample first, read the value from the sensor and set `SOIL_SENSOR_VALUE_DRY` in the config file. When this step is completed, put the sensor in the saturated sample and read the value and set `SOIL_SENSOR_VALUE_WET` to the result.   

### Step 4:  

#### Upload the Code:  

Click on the upload button (right arrow icon) in the PlatformIO to compile and upload the code to the Arduino board.  

### Step 5:  

#### Monitor Serial Output  

##### Open Serial Monitor (using VS-Code):

After uploading the code, open the Serial Monitor in the PlatformIO by clicking the icon that looks like a plug in the right upper corner.  

Set the baud rate to 9600.  

##### Open Serial Monitor (using PlatformIO terminal interface):

After uploading the code, open the Serial Monitor in the PlatformIO by clicking the icon that looks like a plug in the right upper corner.  

Set the correct baudrate by pressing `Ctrl+T`, `Ctrl+B`, and then entering the desired baudrate of 9600.  

##### Validate sensor states:  

The Serial Monitor will display messages indicating the status of sensors and will display sensor values upon transmission.

### Step 6:   

**Data Transmission**

**Data Sending:**

The application will read values from the sensors and send the data as a JSON string to the specified endpoint (/admins/authenticated/monitoring/postmonitoring) over WiFi.  

**Monitor Data:**  

You can monitor the transmitted data in the Serial Monitor, which will display the JSON string sent to the server.  

## Troubleshooting  
No Data Received:
Ensure that the WiFi connection is established successfully.
Ensure that the correct WiFi credentials are entered in the file secrets.h
Check the endpoint URL and port number for correctness.
Sensor Readings are Incorrect:
Verify the connections of the sensors.
Ensure that the sensors are functioning properly.
Compilation Errors:
Make sure all required libraries are installed and included correctly.


## Appendix:
Source: https://helptheengineer.com/method-for-preparation-of-dry-soil-samples-for-various-tests/ 
How to Dry and Saturate soil samples. 

Required Equipment
An oven that can reach 200 °C.
Scale with an accuracy of 0.1 g
2 Soil Samples

Procedure:
Dry one of the the soil samples from the field in the oven at 100 - 120 degrees celsius. Weigh the soil, record the value, and spread the soil out on a tray or in an oven-safe container. Place the tray in the oven and take it out after a few hours, then weigh the soil sample again. Repeat this process until the soil no longer loses weight. When you get the same weight two times in a row, the soil is completely dried. Store the soil in an airtight container.
To saturate the soil with moisture, gradually mix in small amounts of water. The soil should be thoroughly wet, but there should be no excess water in the sample container. If you add too much water, you can use paper to absorb the excess. Store this soil sample in an airtight container.
