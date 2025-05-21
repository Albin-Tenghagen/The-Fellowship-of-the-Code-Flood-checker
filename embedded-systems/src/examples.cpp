#include "lora/fellowship_lora.h"
#include "wifi/fellowship_wifi.h"

void WiFiExample()
{
    Serial.begin(115200);

    while (!Serial);

    fellowshipWiFi::connectWiFi({192, 168, 8, 201}, {192, 168, 8, 1});

    // This will throw an error since JSON is empty
    fellowshipWiFi::sendRequest({192, 168, 8, 169}, 5001, "/admins/authenticated/monitoring/postmonitoring/", "{}");

    String buffer;
    fellowshipWiFi::recieveData(buffer);

    Serial.println(buffer);
}

void LoRaExampleWrite()
{
    Serial.begin(115200);
 
    while (!Serial);

    int16_t status = fellowshipLoRa::init();
    if (status != RADIOLIB_ERR_NONE)
    {
        Serial.print("Unable to initialize LoRa! Error "); 
        Serial.println(status);

        while ( true );
    }

    static String message = "Hello, World!";

    while (true) 
    {
        Serial.printf("[SX1262] Sending value (%li) to LoRa!", 42);
        fellowshipLoRa::write(42);

        Serial.printf("[SX1262] Writing message \"%s\" to LoRa!", message);
        fellowshipLoRa::write(message);
            
        delay(1000);
    }
}

void LoRaExampleRead()
{
    Serial.begin(115200);
 
    while (!Serial);

    int16_t status = fellowshipLoRa::init();
    if (status != RADIOLIB_ERR_NONE)
    {
        Serial.print("Unable to initialize LoRa! Error "); 
        Serial.println(status);

        while ( true );
    }

    static String message;

    while (true) 
    {
        fellowshipLoRa::readUntilValueRecv(message);

        int16_t value = fellowshipLoRa::convertToInt16(message[0], message[1]);
        Serial.printf("[SX1262] Value recieved! %li\n", value);

        fellowshipLoRa::readUntilValueRecv(message);
        Serial.printf("[SX1262] Message recieved! %s\n", message);

        delay(1000);
    }
}