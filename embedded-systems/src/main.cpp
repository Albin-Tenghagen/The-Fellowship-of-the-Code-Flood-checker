#include <Arduino.h>
#include <WaterPressure.h>

WaterPressure::WaterPressureSensor water_pressure_sensor(A4);

void setup()
{
    Serial.begin(115200);
}

void loop()
{
    WaterPressure::readWaterLevel(water_pressure_sensor);
}