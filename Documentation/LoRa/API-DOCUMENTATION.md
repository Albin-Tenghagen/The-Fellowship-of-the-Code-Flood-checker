# API Documentation for LoRa wrapper library

## fellowship_lora_config.h

The config file stores configurations to be used when initializing LoRa. If any changes are to be made then it must be done before `fellowship::init()` is called, otherwise it will have no effect. 

[config](/embedded-systems/include/lora/fellowship_lora_config.h)

## int16_t init()

The init function initializes LoRa so that it can broadcast and read messages.

Returns `RADIOLIB_ERR_NONE` on success and any other `RADIOLIB_ERR_*` on failiure.

## bool wasInit()

Returns true if `init()` has been called

## int16_t read(String &buffer)

Reads a message from LoRa and writes message to buffer unless an error occurs. This function is blocking. On timeout function returns `RADIOLIB_ERR_RX_TIMEOUT`.

## int16_t readUntilValueRecv(String &buffer)

Reads a message from LoRa and writes the received value to the buffer but unlike `read(String&)` does not return a timeout. This function is blocking.

## int16_t write(int16_t value)

Converts `value` to two 8-bit values and writes message to LoRa. Returns RADIOLIB_ERR (int16_t).

## int16_t write(String &msg)

Transmits the provided string using LoRa. Returns RADIOLIB_ERR (int16_t).

## uint16_t convertToInt16(uint8_t higherBits, uint8_t lowerBits)

Converts two 8 bit values to a 16 bit value where the parameters represents the values to be joined as a 16 bit value.

# Example usage

## Sending data

```cpp
#include <Arduino.h>
#include "lora/fellowship_lora.h"

int16_t value = (42 << 8) + 42;
String msg = "Hello, World!";

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
    fellowshipLoRa::write(value);
    fellowshipLoRa::write(msg);

    Serial.println("[SX1262] Message sent!");
    
    delay(1000);
}
```

## Reading data using readUntilValueRecv

```cpp
#include <Arduino.h>
#include "lora/fellowship_lora.h"

int16_t value = (42 << 8) + 42;
String msg = "Hello, World!";

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
    String msg;
    fellowshipLoRa::readUntilValueRecv(msg);

    Serial.printf("[SX1262] Message received: %li\n", fellowshipLoRa::convertToInt16(msg[0], msg[1]));
}
```

## Reading data using read

```cpp
#include <Arduino.h>
#include "lora/fellowship_lora.h"

int16_t value = (42 << 8) + 42;
String msg = "Hello, World!";

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
    String msg;
    int16_t status = fellowshipLoRa::read(msg);

    if (status == RADIOLIB_ERR_NONE)
    {
        Serial.printf("[SX1262] Message received: %s\n", msg.c_str());
    } 
    else if (status != RADIOLIB_ERR_RX_TIMEOUT) 
    {
        Serial.printf("[SX1262] Something went wrong!");
        while ( true ) { }
    }
}
```