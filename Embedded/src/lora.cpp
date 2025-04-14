#include <LoRa.h>

inline LoRaClass _LoRa;

void startTransmission(const char *msg) 
{
    _LoRa = LoRaClass();
    _LoRa.setPins();

    _LoRa.begin(1400, false);
}