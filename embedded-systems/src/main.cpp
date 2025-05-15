#include <Arduino.h>
#include <RTOS.h>

uint16_t sensor_value;
uint16_t depth_mm;
uint16_t sensor_value_sum;
uint16_t sensor_average_value;
const uint8_t SENSOR = A4;
const uint8_t MEASURING_POINTS = 50;

void setup()
{
    Serial.begin(115200);
}

void loop()
{
    for (uint8_t i = 0; i < MEASURING_POINTS; i++)
    {
        sensor_value = analogRead(SENSOR);
        depth_mm = (float(map(sensor_value, 600, 3840, 0, 2000)) * 1.20f) / 10;

        delay(100);
    }

    Serial.print("Sensor value: ");
    Serial.print(sensor_value);
    Serial.print(", Depth in mm: ");
    Serial.println(depth_mm);
}