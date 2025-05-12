#include <Arduino.h>
#include <LittleFS.h>
#include <ArduinoJson.h>
#include "JsonHandling.h"

void setup() {
  Serial.begin(9600);
  LittleFS.begin();
  delay(10000);

  JsonHandling::readAndPrintJson();
  delay(10000);
}

void loop() {
  JsonHandling::writeJson(58, 22.5, 45, 105, 105.5);
  JsonHandling::readAndPrintJson();
  delay(10000);

  JsonHandling::writeJson(55, 20.5, 60, 103, 102.5);
  JsonHandling::readAndPrintJson();
  delay(10000);
}