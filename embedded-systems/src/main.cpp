#define __SERVER__
#ifdef __SERVER__

#include <Arduino.h>
#include <ArduinoJson.h>

#include <WaterPressure.h>
#include <fellowship_lora.h>
#include <fellowship_wifi.h>
#include "SoilSensor.h"
#include <hcsr04.h>
#include "DHTSensor.h"

#include <secrets.h>
#include "fellowship_config.h"

int16_t water_level_cm = 0;

JsonDocument json;

void setup()
{
    Serial.begin(9600);

    while (!Serial);

    fellowshipLoRa::init();

    // Initialize all sensors
    Soil::initiateSoilSensor(SOIL_SENSOR_PIN, SOIL_SENSOR_POWER_PIN);
    hcsr04::begin(HCSR04_SENSOR_TRIGGER_PIN, HCSR04_SENSOR_ECHO_PIN);
    DHTSensor::initDHTSensor(DHT11_SENSOR_PIN);

    fellowshipWiFi::connectWiFi();

    // Configure for debugging
    hcsr04::setMockMode(false);
    hcsr04::setMockDuration(hcsr04::simulateEchoDurationFromCM(10));
    
    //fellowshipWiFi::sendLoginRequest({192, 168, 8, 169}, 5001, "/admins/login", BACKEND_USERNAME, BACKEND_PASSWORD, BACKEND_EMAIL);


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
    // Read values
    String str;

    fellowshipLoRa::readUntilValueRecv(str);

    if (str.length() == 2)
        water_level_cm = fellowshipLoRa::convertToInt16(str[0], str[1]);
    else
        water_level_cm = str[0];

    /* Serial.print("water_level_mm: ");
    Serial.println(water_level_cm);

    Serial.printf("String water_level: %s\n", str); */

    Soil::updateSoilSensorValue();
    DHTSensor::readDHTSensor();
    float distance_us = hcsr04::readRelativeToBaseline();

    json["station_id"] = 1;
    json["soil_moisture_percent"] = Soil::soil_reading_value_in_precentage;
    json["temperature_c"] = DHTSensor::temperature;
    json["humidity_percent"] = DHTSensor::humidity;
    json["water_level_ultrasound_cm"] = distance_us;
    json["water_level_pressure_cm"] = water_level_cm;
    json["water_level_average_cm"] = (double) (distance_us + (double) water_level_cm) / 2.0; 

    String jsonStr;
    serializeJson(json, jsonStr);

    Serial.println(jsonStr);

    fellowshipWiFi::sendRequest({192, 168, 10, 84}, 5001, "/admins/authenticated/monitoring/postmonitoring", jsonStr, false);
    fellowshipWiFi::recieveData(str);

    // Serial.println(str);
    // WaterPressure::readWaterLevel(water_pressure_sensor);
    // fellowshipLoRa::write(water_pressure_sensor.depth_cm);
    
    delay(10000);
}

#else

#include <Arduino.h>
#include <RTOS.h>
#include <fellowship_config.h>

#include <fellowship_lora.h>
#include "WaterPressure.h"

uint64_t first_millis = 0;
uint64_t second_millis = 0;
const uint64_t DELAY_TIME = 20000; // Set to every 20th second instead of 30th minute for demo

WaterPressure::WaterPressureSensor sensor { WATER_SENSOR_PIN };

void setup()
{
    Serial.begin(9600);
    WaterPressure::createBaseline(sensor);
    fellowshipLoRa::init();
}

void loop()
{
    first_millis = millis();

    WaterPressure::readWaterLevel(sensor);

    Serial.println(sensor.depth_cm);

    fellowshipLoRa::write( sensor.depth_cm );

    second_millis = millis();

    delay(DELAY_TIME - (second_millis - first_millis));

}

#endif