// #include <Arduino.h>
// #include "SoilSensor.h"
// #include "hcsr04.h"
// #include <DHTSensor.h>

// //Delete these variables in the real program
// unsigned long previous_reading = 0;
// unsigned long interval_reading = 10000;
// float HCSR04distance = 0.0;

// void setup() 
// {
//   Soil::InitiateSoilSensor();
//   DHTSensor::InitDHTSensor();
//   hcsr04::begin(20, 19);
//   hcsr04::calibrateZero(20.0);
// }

// void loop() 
// {
//   //Delete if statement and previous_reading code and only run Soil::updateSoilSensorValue() 
//   //in the real program
//   if(millis() - previous_reading >= interval_reading) 
//     {
//       Soil::updateSoilSensorValue();
//       HCSR04distance = hcsr04::readDistance();
//       Serial.print("Distance: ");
//       Serial.print(HCSR04distance);
//       Serial.println(" cm");
//       DHTSensor::ReadDHTSensor();
//       DHTSensor::PrintDHTSensor();
//       previous_reading = millis();
//     }
// }