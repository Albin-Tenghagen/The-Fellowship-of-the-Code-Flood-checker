#include <LoRa.h>
#include <heltec.h>

void codeExampleSendData(const char *msg)
{
    Heltec.begin();
    LoRa.begin(433.05E6, false);
    
    // Start the LoRa transmission
    LoRa.beginPacket();
    LoRa.print(msg);
    LoRa.endPacket();

    LoRa.end();
}

void codeExampleRecvData(const char *msg)
{
    Heltec.begin();
    LoRa.begin(433.05E6, false);
    
    // Start the LoRa transmission
    int packetSize = LoRa.parsePacket();

    if (packetSize) {
      String receivedMessage = "";
      while (LoRa.available()) {
        receivedMessage += (char)LoRa.read();
      }
    }

    LoRa.end();
}