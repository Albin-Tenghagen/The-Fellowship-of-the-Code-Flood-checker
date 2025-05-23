#ifndef __SERVER__

#include <Arduino.h>
#include <ArduinoJson.h>

#include "WaterPressure.h"
#include "lora/fellowship_lora.h"
#include "wifi/fellowship_wifi.h"
#include "SoilSensor.h"
#include "hcsr04.h"
#include "DHTSensor.h"

WaterPressure::WaterPressureSensor water_pressure_sensor(A4);


JsonDocument json;

void setup()
{
    Serial.begin(9600);

    while (!Serial);

    // Initialize all sensors
    Soil::initiateSoilSensor(4, 5);
    hcsr04::begin(6, 7);
    DHTSensor::initDHTSensor(8);

    fellowshipWiFi::connectWiFi({192, 168, 8, 201}, {192, 168, 8, 1});

    // Configure for debugging
    hcsr04::setMockMode(true);
    hcsr04::setMockDuration(hcsr04::simulateEchoDurationFromCM(10));
    
    // Read values
    WaterPressure::readWaterLevel(water_pressure_sensor);
    Soil::updateSoilSensorValue();
    DHTSensor::readDHTSensor();
    float distance_us = hcsr04::readDistance();

    json["station_id"] = 1;
    json["soil_moisture_percent"] = Soil::soil_reading_value_in_precentage;
    json["temperature_c"] = DHTSensor::temperature;
    json["humidity_percent"] = DHTSensor::humidity;
    json["water_level_ultrasound_cm"] = distance_us;
    json["water_level_pressure_cm"] = (double) water_pressure_sensor.depth_mm / 10;
    json["water_level_average_cm"] = (double) (distance_us + (double) water_pressure_sensor.depth_mm / 10) / 2.0;

    String str;
    serializeJson(json, str);

    Serial.println(str);


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