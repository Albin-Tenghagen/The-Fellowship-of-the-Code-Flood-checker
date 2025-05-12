#include <Arduino.h>
#include "SoilSensor.h"
#include <LittleFS.h>
#include <ArduinoJson.h>

//Delete these variables in the real program
unsigned long previous_reading = 0;
unsigned long interval_reading = 10000;

const char *filename = "/SensorData.json";

void setup() 
{
  if (!LittleFS.begin()) {
    Serial.println("LittleFS kunde inte startas");
    return;
  }
  Soil::InitiateSoilSensor();
}

void loop() 
{
  //Delete if statement and previous_reading code and only run Soil::updateSoilSensorValue() 
  //in the real program
  if(millis() - previous_reading >= interval_reading) 
    {
      //Soil::updateSoilSensorValue();
      previous_reading = millis();
    
    // Skapa JSON-objekt
    //StaticJsonDocument<200> jsonDoc;
    //jsonDoc["SoilMoisture"] = Soil::soil_reading_value_in_precentage;

  StaticJsonDocument<256> jsonDoc;
  jsonDoc["SoilMoisture"] = 58;
  jsonDoc["Temperature"] = 22.5;
  jsonDoc["Humidity"] = 45;
  jsonDoc["WaterlevelPressure"] = 105; 
  jsonDoc["WaterlevelUltraSound"] = 105.5;



    // Skriv till fil (överskriv)
    File file = LittleFS.open(filename, "w");
    if (!file) {
      Serial.println("Kunde inte öppna filen för skrivning");
      return;
    }

    serializeJson(jsonDoc, file);
    file.close();

    Serial.println("Sensordata sparad till JSON-fil");
  }
}