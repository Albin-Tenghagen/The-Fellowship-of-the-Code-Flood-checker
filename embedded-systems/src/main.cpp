#include <Arduino.h>
#include <RTOS.h>

#include <WiFi.h>

#include "lora/fellowship_lora.h"

void connectToWiFi()
{
    WiFi.config(
        IPAddress{192, 168, 8, 198},
        IPAddress{192, 168, 8, 1},
        IPAddress{255, 255, 255, 255},
        IPAddress{1, 1, 1, 1}
    );

    WiFi.begin("SSID", "PASSWORD");
    uint8_t status = WiFi.waitForConnectResult();
    

    Serial.println(status);

    if (WiFi.isConnected()) Serial.println("Internet Connected");
    else Serial.println("Not connected");
}

constexpr char *requestHeader[] = {
    "GET /api/endpoint HTTP/1.1",
    "Host: 192.168.8.169",
    "Connection: close"
};

void setup()
{
    Serial.begin(115200);

    while (!Serial);

    connectToWiFi();

    WiFiClient client;
    client.connect("192.168.8.169", 3000);
    
    for (int i = 0; i < 3; i++)
    {
        client.println(requestHeader[i]);
    }

    while(client.available())
    {
        char c = client.read();
        Serial.print(c);
    }

    if(!client.connected())
    {
        Serial.println("disconnected");
        client.stop();
    }


    // FellowshipLoRa::init();

    // if (!FellowshipLoRa::wasInit() || FellowshipLoRa::errorFlag != RADIOLIB_ERR_NONE) 
    // {
    //     Serial.println(FellowshipLoRa::errorMsg);
    //     return;
    // }

    // String msg = "Hello, World!";
    // FellowshipLoRa::write(msg);

    // String msg;
    // FellowshipLoRa::read(msg);

    // Serial.println(msg);
}

void loop()
{

}