#ifndef FELLOWSHIP_CONFIGURATIONS_H
#define FELLOWSHIP_CONFIGURATIONS_H

// ---- Unit 1 ----

#define SOIL_SENSOR_PIN						      4
#define SOIL_SENSOR_POWER_PIN				    5

#define DHT11_SENSOR_PIN					      8

#define HCSR04_SENSOR_TRIGGER_PIN			  6
#define HCSR04_SENSOR_ECHO_PIN				  7

// ---- Unit 2 ----

#define WATER_SENSOR_PIN            		7

// -- Water sensor --

#define WATER_SENSOR_CORRECTION_VALUE		1.2

#define WATER_SENSOR_VALUE_AT_0m			  600
#define WATER_SENSOR_VALUE_AT_2m			  3840

// -- Soil sensor

#define SOIL_SENSOR_VALUE_DRY				    4095
#define SOIL_SENSOR_VALUE_WET				    1800

#endif
