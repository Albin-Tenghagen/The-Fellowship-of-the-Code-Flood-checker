#include <Arduino.h>
#include <heltec.h>

void printToOled(int);

void setup()
{
    Heltec.begin(true, true, false);
    Heltec.VextON();
    Heltec.LoRa.setTxPower(1, DIO0);
    Heltec.LoRa.setSyncWord(0x69);
    Heltec.LoRa.onReceive(printToOled);
    Heltec.LoRa.setFrequency(868E6);
    
    if (Heltec.LoRa.begin(868E6, false) == 0) {
        Heltec.display->init();
        Heltec.display->setFont(ArialMT_Plain_10);
        Heltec.display->clear();
        Heltec.display->setColor(WHITE);
        Heltec.display->drawString(0, 0, "LoRa initialized");
        Heltec.display->display();
    } else {
        Heltec.display->init();
        Heltec.display->setFont(ArialMT_Plain_10);
        Heltec.display->clear();
        Heltec.display->setColor(WHITE);
        Heltec.display->drawString(0, 0, "LoRa failed to initialize");
        Heltec.display->display();
    }
}

void loop()
{
    if (Heltec.LoRa.beginPacket() == 1) {
        Heltec.LoRa.print("Hello, World!");
        Heltec.LoRa.endPacket();
        Heltec.display->clear();
        Heltec.display->drawString(0, 0, "Packet sent");
        Heltec.display->display();
    } else {
        Heltec.display->clear();
        Heltec.display->drawString(0, 0, "Failed to send packet");
        Heltec.display->display();
    }

    delay(1000);
}

void printToOled(int data)
{
    Heltec.display->clear();
    Heltec.display->write(Heltec.LoRa.readString().c_str());
    Heltec.display->display();
}
