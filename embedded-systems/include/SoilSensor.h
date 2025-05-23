#ifndef SoilSensor_h
#define SoilSensor_h
#include <Arduino.h>

namespace Soil 
{
  uint16_t soil_sensor_pin = 7;
  uint16_t soil_sensor_power_pin = 6;
  uint16_t soil_reading_value = 0;
  uint16_t soil_reading_value_in_precentage;

  // Function prototypes
  void readSoilMoistureSensor();
  void turnSoilMoistureToPrecentage();
  void printSoilMoistureSensorValues(); //Comment out/delete this function for the real program
  void updateSoilSensorValue();

  /**
   * @brief Initializes correct pins. Uses `soil_sensor_pin` and `soil_sensor_power_pin` variables as pins
   * 
   */
  void initiateSoilSensor() 
  {
    pinMode(soil_sensor_pin,INPUT);
    pinMode(soil_sensor_power_pin,OUTPUT);
    digitalWrite(soil_sensor_power_pin,LOW); 
  }

  void initiateSoilSensor(uint16_t soil_sensor_pin, uint16_t soil_sensor_power_pin) 
  {
    Soil::soil_sensor_pin = soil_sensor_pin;
    Soil::soil_sensor_power_pin = soil_sensor_power_pin;

    pinMode(soil_sensor_pin,INPUT);
    pinMode(soil_sensor_power_pin,OUTPUT);
    digitalWrite(soil_sensor_power_pin,LOW); 
  }

  void updateSoilSensorValue() 
  {
      readSoilMoistureSensor();
      digitalWrite(soil_sensor_power_pin,LOW);
      turnSoilMoistureToPrecentage(); 
      printSoilMoistureSensorValues();//Comment out/delete this function for the real program, just debugging  
  }

  void readSoilMoistureSensor()
  {
    digitalWrite(soil_sensor_power_pin,HIGH);
    delay(10);
    soil_reading_value = analogRead(soil_sensor_pin);
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