#ifndef __SERVER__

#include <Arduino.h>
#include <WaterPressure.h>
#include "lora/fellowship_lora.h"

WaterPressure::WaterPressureSensor water_pressure_sensor(A4);

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
    WaterPressure::readWaterLevel(water_pressure_sensor);
    fellowshipLoRa::write(water_pressure_sensor.depth_mm);
    
    delay(1000);
}

#endif