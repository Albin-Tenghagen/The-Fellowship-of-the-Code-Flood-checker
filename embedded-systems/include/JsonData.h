#ifndef JsonData_h
#define JsonData_h

#include <ArduinoJson.h>
#include <Arduino.h>

namespace JsonData
{
    //Funktion som skriver Jsondata till en string som sedan kan skickas.
    String CreateJsonData(int soil, float temp, int hum, int pressure, float ultrasound, float average) 
    {

        //Byt ut alla värden till sensoravläsningar genom anrop till de funktionerna, alt lägg allting i main och anropa funktionerna därifrån.  
        //Väljer att göra dokumentet 256 byte stort, vilket är tillräckligt för att lagra alla värden, men inte onödigt stort. 
        StaticJsonDocument<256> jsonDoc;
        jsonDoc["soil_moisture_percent"] = soil;
        jsonDoc["temperature_c"] = temp;
        jsonDoc["humidity_percent"] = hum;
        jsonDoc["water_level_pressure_cm"] = pressure;
        jsonDoc["water_level_ultrasound_cm"] = ultrasound;
        jsonDoc["water_level_average_cm"] = average;


       String jsonString;
       serializeJson(jsonDoc, jsonString);
       return jsonString;
    }

    //alt funktion som gör samma sak utan biblioteket ArduinoJson
    /*string CreateJsonData(int soil, float temp, int hum, int pressure, float ultrasound, float average) 
    {
        char jsonString[256];

      sprintf(jsonString,
        "{\n"
        "  \"soil_moisture_percent\": %d,\n"
        "  \"temperature_c\": %.2f,\n"
        "  \"humidity_percent\": %d,\n"
        "  \"water_level_pressure_cm\": %d,\n"
        "  \"water_level_ultrasound_cm\": %.2f,\n"
        "  \"water_level_average_cm\": %.2f\n"
        "}",
        soil, temp, hum, pressure, ultrasound, average);

       return String(jsonString);
    }*/

    String CreateMockJsonData() 
    {
      // Slumpa mock-värden inom rimliga intervall
      int soil = random(0, 100);                    // Jordfuktighet i %
      float temp = random(10.0, 30.0);              // Temperatur i °C
      int humidity = random(40, 80);                // Luftfuktighet i %
      float pressure = random(10, 40);              // Vattentryck i cm
      float ultrasound = pressure + random(-2.0, 3.0);            // Ultraljudsvattennivå i cm
      float average = (pressure + ultrasound) / 2.0;

      // Skapa ett JSON-dokument
      StaticJsonDocument<200> doc;

      doc["soil_moisture_percent"] = soil;
      doc["temperature_c"] = temp;
      doc["humidity_percent"] = humidity;
      doc["water_level_pressure_cm"] = pressure;
      doc["water_level_ultrasound_cm"] = ultrasound;
      doc["water_level_average_cm"] = average;

      // Serialisera till sträng
      String jsonString;
      serializeJson(doc, jsonString);

      return jsonString;
  }
}
#endif