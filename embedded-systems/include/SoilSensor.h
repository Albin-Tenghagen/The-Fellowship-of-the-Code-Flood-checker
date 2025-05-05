#ifndef SoilSensor_h
#define SoilSensor_h
#include <Arduino.h>

namespace Soil 
{
  uint16_t soil_sensor = A0;
  uint8_t soil_sensor_power = 4;
  uint16_t soil_reading_value = 0;
  uint8_t soil_reading_value_in_precentage;

  // Delete these variables for the real program
  unsigned long previous_reading = 0;
  unsigned long interval_reading = 10000;

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
    /*Delete millis and if statement for the real program, just run the readSoilMoistureSensor function,
    digitalWrite, turnSoilMoistureToPrecentage function. No need to run printSoilMoistureSensorValues */
    if(millis() - previous_reading >= interval_reading) 
    {
      previous_reading = millis();
      readSoilMoistureSensor();
      digitalWrite(soil_sensor_power,LOW);
      turnSoilMoistureToPrecentage(); 
      printSoilMoistureSensorValues();//Comment out/delete this function for the real program
    }
  
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
    soil_reading_value_in_precentage = map(soil_reading_value, 270, 1023, 100, 0);
  }
}
#endif