// #include <Arduino.h>
// #include "SoilSensor.h"
// #include "hcsr04.h"
// #include <DHTSensor.h>
// #include <fellowship_wifi.h>
// #include <secrets.h>

// //Delete these variables in the real program
// unsigned long previous_reading = 0;
// unsigned long interval_reading = 10000;
// float HCSR04distance = 0.0;

// void setup() 
// {
//     Serial.begin(9600);

//     while (!Serial);

//     // JsonDocument credentials;
 
//     fellowshipWiFi::connectWiFi();


//     fellowshipWiFi::sendLoginRequest({192, 168, 8, 169}, 5001, "/admins/login", BACKEND_USERNAME, BACKEND_PASSWORD, BACKEND_EMAIL);

//     JsonDocument json;

//     json["station_id"] = 1;
//     json["soil_moisture_percent"] = Soil::soil_reading_value_in_precentage;
//     json["temperature_c"] = DHTSensor::temperature;
//     json["humidity_percent"] = DHTSensor::humidity;
//     json["water_level_ultrasound_cm"] = distance_us;
//     json["water_level_pressure_cm"] = water_level_cm;
//     json["water_level_average_cm"] = (double) (distance_us + (double) water_level_cm) / 2.0; 

//     fellowshipWiFi::sendRequest({192, 168, 8, 169}, 5001, "/postmonitoring", )

//     // Serial.println(fellowshipWiFi::token.token);
// }

// void loop() 
// {

// }