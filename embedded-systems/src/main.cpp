// #define __SERVER__
#ifdef __SERVER__

#include <Arduino.h>
#include <ArduinoJson.h>

#include "WaterPressure.h"
#include "lora/fellowship_lora.h"
#include "wifi/fellowship_wifi.h"
#include "SoilSensor.h"
#include "hcsr04.h"
#include "DHTSensor.h"

int16_t water_level_mm = 0;

JsonDocument json;

void setup()
{
    Serial.begin(9600);

    while (!Serial);

    fellowshipLoRa::init();

    // Initialize all sensors
    Soil::initiateSoilSensor(4, 5);
    hcsr04::begin(6, 7);
    DHTSensor::initDHTSensor(8);

    fellowshipWiFi::connectWiFi({192, 168, 8, 201}, {192, 168, 8, 1});

    // Configure for debugging
    hcsr04::setMockMode(false);
    hcsr04::setMockDuration(hcsr04::simulateEchoDurationFromCM(10));
    
    // Read values
    String str;

    fellowshipLoRa::readUntilValueRecv(str);
    water_level_mm = fellowshipLoRa::convertToInt16(str[0], str[1]);

    Soil::updateSoilSensorValue();
    DHTSensor::readDHTSensor();
    float distance_us = hcsr04::readDistance();

    json["station_id"] = 1;
    json["soil_moisture_percent"] = Soil::soil_reading_value_in_precentage;
    json["temperature_c"] = DHTSensor::temperature;
    json["humidity_percent"] = DHTSensor::humidity;
    json["water_level_ultrasound_cm"] = distance_us;
    json["water_level_pressure_cm"] = (double) water_level_mm / 10;
    json["water_level_average_cm"] = (double) (distance_us + (double) water_level_mm / 10) / 2.0; 

    String jsonStr;
    serializeJson(json, jsonStr);

    Serial.println(jsonStr);


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
    // fellowshipLoRa::write(water_pressure_sensor.depth_cm);
    
    // delay(1000);
}

#else

#include <Arduino.h>
#include <RTOS.h>

#include "lora/fellowship_lora.h"
#include "WaterPressure.h"

WaterPressure::WaterPressureSensor sensor { A4 };

void setup()
{
    Serial.begin(9600);
    fellowshipLoRa::init();

    WaterPressure::readWaterLevel(sensor);
    Serial.println(sensor.depth_cm);

    // (16 bit) 0x4020 >> 8 = 0x0040 = (uint8_t) 0x40
    // (16 bit) 0x4020 = (uint8_t) 0x20

    char cStr[3] { 
        (uint8_t) (sensor.depth_cm >> 8),
        (uint8_t) (sensor.depth_cm),
        0
    };

    Serial.println(fellowshipLoRa::convertToInt16(cStr[0], cStr[1]));

    String str { cStr };

    // fellowshipLoRa::write( str );
}

void loop()
{
    // String msg;
    // fellowshipLoRa::readUntilValueRecv(msg);

    // Serial.printf("[SX1262] Message received: %li\n", fellowshipLoRa::convertToInt16(msg[0], msg[1]));

    // Serial.println(analogRead(19));
    // delay(500);
}

#endif