#ifndef __SERVER__

#include <Arduino.h>
#include <WaterPressure.h>
#include "lora/fellowship_lora.h"
#include "wifi/fellowship_wifi.h"

WaterPressure::WaterPressureSensor water_pressure_sensor(A4);

void setup()
{
    Serial.begin(115200);

    while (!Serial);

    fellowshipWiFi::connectWiFi({192, 168, 8, 201}, {192, 168, 8, 1});
    fellowshipWiFi::sendRequest({192, 168, 8, 169}, 5001, "/admins/authenticated/monitoring/postmonitoring/", 
    "{ \"station_id\": 1, \"soil_moisture_percent\": 50, \"temperature_c\": 19.9, \"humidity_percent\": 78, \"water_level_pressure_cm\": 5.5, \"water_level_ultrasound_cm\": 5.2, \"water_level_average_cm\": 5.35 }");

    String buffer;
    fellowshipWiFi::recieveData(buffer);

    Serial.println(buffer);

    // int16_t status = fellowshipLoRa::init();
    // if (status != RADIOLIB_ERR_NONE)
    // {
    //     Serial.print("Unable to initialize LoRa! Error "); 
    //     Serial.println(status);

    //     while ( true ) { }
    // }
}

void loop()
{
    // WaterPressure::readWaterLevel(water_pressure_sensor);
    // fellowshipLoRa::write(water_pressure_sensor.depth_mm);
    
    // delay(1000);
}

#endif