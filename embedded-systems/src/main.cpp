#include <Arduino.h>
#include <ArduinoJson.h>
#include "JsonData.h"


void setup() 
{
    Serial.begin(9600);
}

void loop() {
   String Data = JsonData::CreateMockJsonData();
  Serial.println("Initial JSON Data:");
  Serial.println(Data);
  delay(10000);
}