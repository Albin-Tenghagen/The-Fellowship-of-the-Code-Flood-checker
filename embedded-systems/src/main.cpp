#include <Arduino.h>

uint16_t SoilSensor = A0;
uint16_t SoilReadingValue = 0;;
uint8_t SoilReadingValueInPrecentage;

unsigned long previousReading = 0;
unsigned long intervalReading = 10000;

void setup() 
{
  pinMode(SoilSensor,INPUT); 
  Serial.begin(9600);
}

void loop() 
{
  if(millis() - previousReading >= intervalReading) 
  {
    previousReading = millis();
    readSoilMoistureSensor();
    turnSoilMoistureToPrecentage(); 
    printSoilMoistureSensorValues();
  }
 
}

void readSoilMoistureSensor()
{
  SoilReadingValue = analogRead(SoilSensor);
}

void printSoilMoistureSensorValues()
{
  Serial.println(SoilReadingValue);
  Serial.println(SoilReadingValueInPrecentage);
}

void turnSoilMoistureToPrecentage()
{
  SoilReadingValueInPrecentage = map(SoilReadingValue, 340, 1023, 100, 0);
}
