#include <Arduino.h>
#include <RTOS.h>

#include <WiFi.h>

#include "lora/fellowship_lora.h"
#include "wifi/fellowship_wifi.h"

void setup()
{
    Serial.begin(115200);

    if (!fellowshipLoRa::init())
    {
        Serial.println("Unable to initialize LoRa");
        while (true) { };
    }

}

void loop()
{
    Serial.print("[SX1262] Waiting for transmission ");

    String msg;
    bool status = fellowshipLoRa::read(msg);

    fellowshipLoRa::error_flag = fellowshipLoRa::device.receive(msg);

    if (fellowshipLoRa::error_flag == RADIOLIB_ERR_NONE)
    {
        Serial.println("success!");
        Serial.println(msg);
    }
    else if (fellowshipLoRa::error_flag == RADIOLIB_ERR_RX_TIMEOUT) {
        // timeout occurred while waiting for a packet
        Serial.println(F("timeout!"));
    
    } else if (fellowshipLoRa::error_flag == RADIOLIB_ERR_CRC_MISMATCH) {
        // packet was received, but is malformed
        Serial.println(F("CRC error!"));
    
    } else {
        // some other error occurred
        Serial.print(F("failed, code "));
        Serial.println(fellowshipLoRa::error_flag);
    
    }

    

    // Serial.println("[SX1262] Will do transmission\n");

    // String msg;
    // fellowshipLoRa::write(msg);
    // if (fellowshipLoRa::error_flag != RADIOLIB_ERR_NONE)
    // {
    //     Serial.print("Unable to send message");
    //     while ( true ) {  };
    // }
    // else
    // {
    //     Serial.print("Message sent!");
    //     Serial.println(msg);
    // }

    // delay(5000);
}