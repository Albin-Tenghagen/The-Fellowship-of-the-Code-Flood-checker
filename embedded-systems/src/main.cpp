#include <Arduino.h>
#include <RTOS.h>

#include <WiFi.h>

#include "lora/fellowship_lora.h"
#include "wifi/fellowship_wifi.h"

void setup()
{
    Serial.begin(115200);

    if (fellowshipLoRa::init() != RADIOLIB_ERR_NONE)
    {
        Serial.println("Unable to initialize LoRa");
        while (true) { };
    }

}

void loop()
{
    // Serial.print("[SX1262] Waiting for transmission ");

    // String msg;

    // int16_t status = fellowshipLoRa::read(msg);

    

    // if (status == RADIOLIB_ERR_NONE)
    // {
    //     Serial.println("success!");
    //     uint16_t value = msg[0] + msg[1];
    //     Serial.println(value);
    // }
    // else if (status == RADIOLIB_ERR_RX_TIMEOUT) {
    //     // timeout occurred while waiting for a packet
    //     Serial.println(F("timeout!"));
    
    // } else if (status == RADIOLIB_ERR_CRC_MISMATCH) {
    //     // packet was received, but is malformed
    //     Serial.println(F("CRC error!"));
    
    // } else {
    //     // some other error occurred
    //     Serial.print(F("failed, code "));
    //     Serial.println(fellowshipLoRa::error_flag);
    
    // }

    
    uint16_t data = 0x3031;

    Serial.println("[SX1262] Will do transmission\n");

    char msg[] = { (uint8_t) ((0x3031 & 0xFF00) >> 8), (uint8_t) (0x3031), 0 };
    String str{msg};

    fellowshipLoRa::write(str);
    if (fellowshipLoRa::error_flag != RADIOLIB_ERR_NONE)
    {
        Serial.print("Unable to send message");
        while ( true ) {  };
    }
    else
    {
        Serial.print("Message sent!");
        Serial.println(msg);
    }

    delay(5000);
}