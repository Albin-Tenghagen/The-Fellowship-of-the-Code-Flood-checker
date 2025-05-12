#include <Arduino.h>
#include "SoilSensor.h"

//Delete these variables in the real program
unsigned long previous_reading = 0;
unsigned long interval_reading = 10000;

void setup() 
{
  Soil::InitiateSoilSensor();
}

void loop() 
{
  //Delete if statement and previous_reading code and only run Soil::updateSoilSensorValue() 
  //in the real program
  if(millis() - previous_reading >= interval_reading) 
    {
      Soil::updateSoilSensorValue();
      previous_reading = millis();
    }
}