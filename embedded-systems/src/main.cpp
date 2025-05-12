#include <Arduino.h>
#include <RTOS.h>

#include <WiFi.h>

#include "lora/fellowship_lora.h"
#include "wifi/fellowship_wifi.h"

void connectToWiFi()
{
    WiFi.config(
        IPAddress{192, 168, 8, 198},
        IPAddress{192, 168, 8, 1},
        IPAddress{255, 255, 255, 0},
        IPAddress{1, 1, 1, 1}
    );

    WiFi.setHostname("Heltec Board");

    WiFi.begin("SSID", "PASSPHRASE");
    uint8_t status = WiFi.waitForConnectResult();
    

    Serial.println(status);

    if (WiFi.isConnected()) Serial.println("Internet Connected");
    else Serial.println("Not connected");
}

String requestHeader[] = {
    "GET / HTTP/1.1",
    "Host: 192.168.8.169",
    "Connection: close"
};

WiFiClient client{};

void setup()
{
    Serial.begin(9600);

    while (!Serial);

    fellowshipWiFi::connectWiFi("HUAWEI-B535-0B48", "2MLRG8FFA58", { 192, 168, 8, 198 }, { 192, 168, 8, 1 }, { 255, 255, 255, 0 });
    fellowshipWiFi::sendData(GET, {192, 168, 8, 169}, 5000, "/", "");

    String data;
    fellowshipWiFi::recieveData(data);

    Serial.println(data);

    // connectToWiFi();

    // if (client.connect(IPAddress{192, 168, 8, 169}, 5000))
    // {
    //     Serial.println("Connected to server");
    //     client.println("GET / HTTP/1.1");
    //     client.println("Host: 192.168.8.169");
    //     client.println("Connection: close");
    //     client.println();
    //     // client.println("GET / HTTP/1.1");
    // }
    // else
    // {
    //     Serial.println("Something went wrong");
    //     Serial.println(WiFi.status());
    // }

    // Serial.println("Headers sent");

    // Serial.println(client.available());
    // while(client.connected())
    // {
    // // read an incoming byte from the server and print them to serial monitor:
    //     if (client.available())
    //         Serial.print(client.readString());
    // }

    // if(!client.connected())
    // {
    // // if the server's disconnected, stop the client:
    //     Serial.println("\nDisconnected");
    //     client.stop();
    // }

    

    // FellowshipLoRa::init();

    // if (!FellowshipLoRa::was_init() || FellowshipLoRa::error_flag != RADIOLIB_ERR_NONE) 
    // {
    //     Serial.println(FellowshipLoRa::error_msg);
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