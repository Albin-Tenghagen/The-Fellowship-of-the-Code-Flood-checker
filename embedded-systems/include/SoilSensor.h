#ifndef SoilSensor_h
#define SoilSensor_h
#include <Arduino.h>

namespace Soil 
{
  uint16_t soil_sensor = 7;
  uint8_t soil_sensor_power = 6;
  uint16_t soil_reading_value = 0;
  uint8_t soil_reading_value_in_precentage;

  // Function prototypes
  void readSoilMoistureSensor();
  void turnSoilMoistureToPrecentage();
  void printSoilMoistureSensorValues(); //Comment out/delete this function for the real program
  void updateSoilSensorValue();

  void InitiateSoilSensor() 
  {
    pinMode(soil_sensor,INPUT);
    pinMode(soil_sensor_power,OUTPUT);
    digitalWrite(soil_sensor_power,LOW); 
    Serial.begin(9600);
  }

  void updateSoilSensorValue() 
  {
      readSoilMoistureSensor();
      digitalWrite(soil_sensor_power,LOW);
      turnSoilMoistureToPrecentage(); 
      printSoilMoistureSensorValues();//Comment out/delete this function for the real program, just debugging  
  }

  void readSoilMoistureSensor()
  {
    digitalWrite(soil_sensor_power,HIGH);
    soil_reading_value = analogRead(soil_sensor);
  }

  //Comment out/delete this function for the real program, just for checking that the sensor is working
  void printSoilMoistureSensorValues()
  {
    Serial.println(soil_reading_value);
    Serial.println(soil_reading_value_in_precentage);
  }

  void turnSoilMoistureToPrecentage()
  {
    soil_reading_value_in_precentage = map(soil_reading_value, 1800, 4095, 100, 0);
  }
}
#endif