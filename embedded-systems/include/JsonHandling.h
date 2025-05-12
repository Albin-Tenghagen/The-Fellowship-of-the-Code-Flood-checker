#ifndef JsonHandling_h
#define JsonHandling_h

#include <ArduinoJson.h>
#include <LittleFS.h>
#include <Arduino.h>

namespace JsonHandling
{
    //Skapa filnamet för Json-filen i microkontrollern. 
    const char *filename = "/SensorData.json";

    //Funktion som läser och skriver ut infon från Jsonfilen som ligger i microkontrollern.
    //Funktionen läser in Json-filen och skriver ut den i Serial Monitor.
    void readAndPrintJson() 
    {
        File file = LittleFS.open(filename, "r");
        if (file) 
        {
            StaticJsonDocument<200> tempDoc;  //Använd temporärt dokument för att inte störa jsonDoc i loop
            DeserializationError error = deserializeJson(tempDoc, file);
            file.close();
            if (!error) 
            {
                Serial.println("Innehåll i SensorData.json:");
                serializeJsonPretty(tempDoc, Serial);
                Serial.println();
            } 
            else 
            {
                Serial.println("Kunde inte läsa JSON");
            } 
        } 
        else 
        {
            Serial.println("Kunde inte öppna filen för läsning");
        }
    }

    //Funktion som skriver in värden i Json-filen som ligger i microkontrollern. Skriver över gamla värden, eftersom de inte behöver sparas i microkontrollern.
    void writeJson(int soil, float temp, int hum, int pressure, float ultrasound) 
    {

        //Byt ut alla värden till sensoravläsningar genom anrop till de funktionerna, alt lägg allting i main och anropa funktionerna därifrån.  
        //Väljer att göra dokumentet 256 byte stort, vilket är tillräckligt för att lagra alla värden, men inte onödigt stort. 
        StaticJsonDocument<200> jsonDoc;
        jsonDoc["SoilMoisture"] = soil;
        jsonDoc["Temperature"] = temp;
        jsonDoc["Humidity"] = hum;
        jsonDoc["WaterlevelPressure"] = pressure;
        jsonDoc["WaterlevelUltraSound"] = ultrasound;

        File file = LittleFS.open(filename, "w");
        if (file) 
        {
            serializeJson(jsonDoc, file);
            file.close();
            Serial.println("JSON uppdaterad och sparad."); 
        } 
        else 
        {
            Serial.println("Kunde inte öppna för skrivning");
        } 
    }
}
#endif