#include "WaterPressure.h"

WaterPressure::WaterPressureSensor::WaterPressureSensor(uint8_t _SENSOR_PIN)
:
SENSOR_PIN(_SENSOR_PIN), MEASURING_POINTS(50), sensor_value_sum(0)
{
    pinMode(SENSOR_PIN, INPUT);
}

WaterPressure::WaterPressureSensor::~WaterPressureSensor()
{
}

void WaterPressure::readWaterLevel(WaterPressureSensor& sensor_object)
{
    for (uint8_t i = 0; i < sensor_object.MEASURING_POINTS; i++)
    {
        sensor_object.sensor_value_sum += analogRead(sensor_object.SENSOR_PIN);

        delay(100);
    }


    sensor_object.sensor_average_value = (float)sensor_object.sensor_value_sum / (float)sensor_object.MEASURING_POINTS;
    sensor_object.sensor_value_sum = 0;
    
    sensor_object.depth_cm = (float(map(sensor_object.sensor_average_value, 600, 3840, 0, 2000)) * 1.20f) / 10.0f;
  
    Serial.print("Sensor value: ");
    Serial.print(sensor_object.sensor_value);
    Serial.print(", Depth in cm: ");
    Serial.println(sensor_object.depth_cm);
}