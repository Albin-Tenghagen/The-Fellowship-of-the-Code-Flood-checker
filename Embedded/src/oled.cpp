#include <Arduino.h>
#include <heltec.h>

void drawCircleDemo() {
    for (int i=1; i < 8; i++) {
        Heltec.display->setColor(WHITE);
        Heltec.display->drawCircle(32, 32, i*3);
        if (i % 2 == 0) {
            Heltec.display->setColor(BLACK);
        }
        Heltec.display->fillCircle(96, 32, 32 - i* 3);
    }
}

void _setup() {
    Heltec.begin(true /*DisplayEnable Enable*/, false /*LoRa Disable*/, true /*Serial Enable*/);
    Heltec.display->setFont(ArialMT_Plain_10);

    Heltec.display->clear();

    drawCircleDemo();
    Heltec.display->display();
}

void _loop() {
    Heltec.display->clear();

}