#include <LoRa.h>

inline LoRaClass _LoRa;

void startTransmission(const char *msg) 
{
    _LoRa = LoRaClass();
    _LoRa.setPins(18, 14, 26);
}