#ifndef DHTSENSOR_H
#define DHTSENSOR_H

#include <Arduino.h>
#include <DHT.h>

namespace DHTSensor
{

    const uint8_t DHTPIN = 5; //Change for the actual pin used 
    const uint8_t DHTTYPE = DHT11;
    DHT dht(DHTPIN, DHTTYPE);
    float temperature;
    uint8_t humidity;

    void InitDHTSensor();
    void ReadDHTSensor();
    void PrintDHTSensor();

    void InitDHTSensor()
    {
        dht.begin();
    }

    void ReadDHTSensor()
    {
        temperature = dht.readTemperature() - 2;
        humidity = dht.readHumidity();
    }

    void PrintDHTSensor()
    {
        Serial.print("Temperature: ");
        Serial.print(temperature, 1);
        Serial.println("°C");
        Serial.print("Humidity: ");
        Serial.print(humidity);
        Serial.println("%");
    }

}

#endif