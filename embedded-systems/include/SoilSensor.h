#ifndef SoilSensor_h
#define SoilSensor_h
#include <Arduino.h>

namespace Soil 
{
  uint16_t SoilSensor = A0;
  uint8_t SoilSensorPower = 4;
  uint16_t SoilReadingValue = 0;
  uint8_t SoilReadingValueInPrecentage;

  unsigned long previousReading = 0;
  unsigned long intervalReading = 10000;

  // Function prototypes
  void readSoilMoistureSensor();
  void turnSoilMoistureToPrecentage();
  void printSoilMoistureSensorValues();
  void updateSoilSensorValue();

  void InitiateSoilSensor() 
  {
    pinMode(SoilSensor,INPUT);
    pinMode(SoilSensorPower,OUTPUT);
    digitalWrite(SoilSensorPower,LOW); 
    Serial.begin(9600);
  }

  void updateSoilSensorValue() 
  {
    if(millis() - previousReading >= intervalReading) 
    {
      previousReading = millis();
      readSoilMoistureSensor();
      digitalWrite(SoilSensorPower,LOW);
      turnSoilMoistureToPrecentage(); 
      printSoilMoistureSensorValues();
    }
  
  }

  void readSoilMoistureSensor()
  {
    digitalWrite(SoilSensorPower,HIGH);
    SoilReadingValue = analogRead(SoilSensor);
  }

  void printSoilMoistureSensorValues()
  {
    Serial.println(SoilReadingValue);
    Serial.println(SoilReadingValueInPrecentage);
  }

  void turnSoilMoistureToPrecentage()
  {
    SoilReadingValueInPrecentage = map(SoilReadingValue, 270, 1023, 100, 0);
  }
}
#endif