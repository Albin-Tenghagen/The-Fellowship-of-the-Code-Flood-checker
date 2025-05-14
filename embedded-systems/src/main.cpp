#include <Arduino.h>
#include <DHTSensor.h>

unsigned long previous_reading = 0; 
unsigned long interval_reading = 3000;

void setup() 
{
    Serial.begin(9600);
    DHTSensor::InitDHTSensor();
}

void loop() 
{
    if (millis() - previous_reading >= interval_reading) 
    {
        previous_reading = millis();
        
        DHTSensor::ReadDHTSensor();
        DHTSensor::PrintDHTSensor();
    }
}