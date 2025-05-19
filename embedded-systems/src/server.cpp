#ifdef __SERVER__

#include <Arduino.h>
#include <RTOS.h>

#include "lora/fellowship_lora.h"

uint16_t recieved_value = 0;

void setup()
{
    Serial.begin(115200);

    int16_t status = fellowshipLoRa::init();
    if (status != RADIOLIB_ERR_NONE)
    {
        Serial.print("Unable to initialize LoRa! Error "); 
        Serial.println(status);

        while ( true ) { }
    }
}

void loop()
{
    
}

#endif