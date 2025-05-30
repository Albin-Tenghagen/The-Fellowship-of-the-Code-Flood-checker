# User Manual

This application is designed to monitor environmental parameters using various sensors and transmit the data via LoRa and WiFi. The server side of the application is responsible for initializing the sensors, reading their values, and sending the collected data to a specified endpoint.

## Requirements

Before setting up the server side application, ensure you have the following:

Two Heltec LoRa 32 V3 boards compatible with the libraries used.

Required sensors:

Soil Moisture Sensor (YL-69)
Ultrasonic Distance Sensor (HC-SR04)
Temperature and Humidity Sensor (DHT11)
LoRa module (SX1262)
WiFi module (if not integrated into the Arduino board)
Arduino IDE installed on your computer
Necessary libraries installed:
ArduinoJson
RadioLib
Any other libraries required for the sensors
Setup Process
Step 1: Hardware Connections
Connect the Sensors:
Soil Moisture Sensor: Connect to digital pins 4 and 5.
Ultrasonic Distance Sensor (HC-SR04): Connect the trigger pin to digital pin 6 and the echo pin to digital pin 7.
DHT Sensor: Connect to digital pin 8.
LoRa Module: Connect the module according to the pin configuration defined in fellowship_lora_config.h.
Power the Arduino:
Ensure the Arduino board is powered through USB or an external power source.
Step 2: Software Installation
Install Arduino IDE:
Download and install the Arduino IDE from the official Arduino website.
Install Required Libraries:
Open the Arduino IDE and navigate to Sketch > Include Library > Manage Libraries.
Search for and install the following libraries:
ArduinoJson
RadioLib
Step 3: Configure the Code
Open the Code:
Open the provided code in the Arduino IDE.
Modify WiFi Credentials:
Ensure that the WiFi credentials (SSID and password) are defined in a separate secrets.h file, which should not be included in version control.
Adjust Sensor Pins (if necessary):
If you are using different pins for the sensors, update the pin numbers in the setup() function accordingly.
Step 4: Upload the Code
Select the Correct Board:
In the Arduino IDE, go to Tools > Board and select the appropriate board type.
Select the Correct Port:
Go to Tools > Port and select the port to which your Arduino is connected.
Upload the Code:
Click on the upload button (right arrow icon) in the Arduino IDE to compile and upload the code to the Arduino board.
Step 5: Monitor Serial Output
Open Serial Monitor:
After uploading the code, open the Serial Monitor in the Arduino IDE (Tools > Serial Monitor).
Set the baud rate to 9600.
Check for Initialization:
The Serial Monitor will display messages indicating the initialization of sensors and the reading of values.
Step 6: Data Transmission
Data Sending:
The application will read values from the sensors and send the data as a JSON string to the specified endpoint (/admins/authenticated/monitoring/postmonitoring) over WiFi.
Monitor Data:
You can monitor the transmitted data in the Serial Monitor, which will display the JSON string sent to the server.
Troubleshooting
No Data Received:
Ensure that the WiFi connection is established successfully.
Check the endpoint URL and port number for correctness.
Sensor Readings are Incorrect:
Verify the connections of the sensors.
Ensure that the sensors are functioning properly.
Compilation Errors:
Make sure all required libraries are installed and included correctly.
Conclusion
This user manual provides a comprehensive guide to setting up the server side of the application. Follow the steps carefully to ensure successful initialization and data transmission. For further assistance, refer to the documentation of the individual libraries and sensors used in the project.