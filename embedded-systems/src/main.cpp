#include <Arduino.h>
#include "SoilSensor.h"

using namespace Soil;
void setup() 
{
  Soil::InitiateSoilSensor();
}

void loop() 
{
  Soil::updateSoilSensorValue();
}