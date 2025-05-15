#include "WaterPressure.h"

WaterPressure::WaterPressureSensor::WaterPressureSensor(uint8_t _SENSOR_PIN)
:
SENSOR_PIN(_SENSOR_PIN), MEASURING_POINTS(50)
{
    pinMode(_SENSOR_PIN, INPUT);
}

WaterPressure::WaterPressureSensor::~WaterPressureSensor()
{
}

void WaterPressure::readWaterLevel(WaterPressureSensor& sensor_object)
{
    for (uint8_t i = 0; i < sensor_object.MEASURING_POINTS; i++)
    {
        sensor_object.sensor_value = analogRead(sensor_object.SENSOR_PIN);
        sensor_object.depth_mm = (float(map(sensor_object.sensor_value, 600, 3840, 0, 2000)) * 1.20f) / 10;

        delay(100);
    }

    // Serial.print("Sensor value: ");
    // Serial.print(sensor_value);
    // Serial.print(", Depth in mm: ");
    // Serial.println(depth_mm);
}