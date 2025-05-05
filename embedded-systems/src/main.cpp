#include <Arduino.h>
#include "SoilSensor.h"

unsigned long previous_reading = 0;
unsigned long interval_reading = 10000;

void setup() 
{
  Soil::InitiateSoilSensor();
}

void loop() 
{
  if(millis() - previous_reading >= interval_reading) 
    {
      Soil::updateSoilSensorValue();
    }
}