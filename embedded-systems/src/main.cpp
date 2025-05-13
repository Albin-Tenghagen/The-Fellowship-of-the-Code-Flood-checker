#include <Arduino.h>
#include <ArduinoJson.h>
#include "JsonData.h"


void setup() 
{
    randomSeed(analogRead(5)); // Initierar slumptalsgeneratorn
    Serial.begin(9600);
}

void loop() 
{
  //Skapar mock-data för att simulera sensoravläsningar
  //Printar ut för att se att det fungerar
  //Borde gå att skicka datan till server via Wifi när det rullar. 
  String Data = JsonData::CreateMockJsonData();
  Serial.println("Initial JSON Data:");
  Serial.println(Data);
  delay(10000);
}