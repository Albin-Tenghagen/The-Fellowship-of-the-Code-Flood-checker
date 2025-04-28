### SoilMoisture Sensor Documentation ###
This is where all documentation will be gathered that has anything to do with the soilmoisture sensor. 

### Sources ###

[How a SoilMoisture Sensor Works](https://lastminuteengineers.com/soil-moisture-sensor-arduino-tutorial/)

[How you can calibrate a SoilMoisture Sensor](https://greensense.github.io/Blog/2017/02/17/Arduino-Soil-Moisture-Sensor-Calibration/)

[How to Dry soil](https://helptheengineer.com/method-for-preparation-of-dry-soil-samples-for-various-tests/)

[Example in tinkercad](https://www.tinkercad.com/things/bPWjNliQ4GU-fabulous-hango/editel?returnTo=https%3A%2F%2Fwww.tinkercad.com%2Fdashboard%2Fdesigns%2Fcircuits)

### Research ### 

I have found out during research that the resistive soilmoisture sensor has a greater risk of corrode, and you are recommend to turn of the sensor when it is not used, to try to prevent corroding as much as you can. If we should build the produt for real, a capacitive soilmoisture sensor is better. But the resistive should work fine in our prototype. 

#### 2025-04-07 ####
I have started to look up how to use a soilmoisture sensor and how it works. I also have started to look up how you can calibrate the sensor and be able to get accurate values from different types of soil. This lead me in on how you properly dry soil to make a accurate soilsample that you can use to calibrate the sensor. Different types of soil makes different values and need diffrent samples to be calibrated correctly. You need to calibrate the soil on each location the sensor is placed so you get accurate values. 

#### 2025-04-14 ####
Today I started to make a small sketch in tinkercad over how you wire the soilmoisture sensor toghter with a microcontroller. I also made the function that translate the gathered value to precentages so it is easier to understand what the value actually means. I found out that the microcontroller we will use isn't supported in tinkercad, so the group started to look up if we can use something else, and we ended on Fritzing.  

#### 2025-04-28 ####
Today I have started to write code for the Soil Moisture sensor. I have built the circuit and tried the sensor as well, it works fine. I had to build it with the Arduino Uno R4 microcontroller though, but it works. When we run it on the right microcontroller I will have to change some things. I will also fix a calibration sample of soil to the next time we will work with this so I can get accurate readings. 