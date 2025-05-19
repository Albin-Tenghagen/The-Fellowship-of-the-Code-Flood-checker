#ifndef __SERVER__

#include <Arduino.h>
#include <WaterPressure.h>

<<<<<<< HEAD:embedded-systems/src/client.cpp
#include "lora/fellowship_lora.h"

uint16_t sensor_value;
uint16_t depth_mm;
uint16_t sensor_value_sum;
uint16_t sensor_average_value;
const uint8_t SENSOR = A4;
const uint8_t MEASURING_POINTS = 50;
=======
WaterPressure::WaterPressureSensor water_pressure_sensor(A4);
>>>>>>> origin/dev_suvx_marco:embedded-systems/src/main.cpp

void setup()
{
    Serial.begin(115200);

    int16_t status = fellowshipLoRa::init();
    if (status != RADIOLIB_ERR_NONE)
    {
        Serial.print("Unable to initialize LoRa! Error "); 
        Serial.println(status);

        while ( true ) { }
    }
}

void loop()
{
<<<<<<< HEAD:embedded-systems/src/client.cpp
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

    int16_t status = fellowshipLoRa::write(depth_mm);
    if (status != RADIOLIB_ERR_NONE)
    {
        Serial.print("Unable to write to LoRa! Error "); 
        Serial.println(status);

        while ( true ) { }
    }

    delay(5000);
}

#endif
=======
    WaterPressure::readWaterLevel(water_pressure_sensor);
}
>>>>>>> origin/dev_suvx_marco:embedded-systems/src/main.cpp
