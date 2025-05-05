// #include <Arduino.h>
// // #include <heltec.h>
// #include <Adafruit_SSD1306.h>

// Adafruit_SSD1306 display{128, 64, &Wire, -1};

// void drawCircleDemo() {
//     for (int i=1; i < 8; i++) {
//         display.setTextColor(WHITE);
//         display.drawCircle(32, 32, i*3, WHITE);
//         // Heltec.display->setColor(WHITE);
//         // Heltec.display->drawCircle(32, 32, i*3);
//         if (i % 2 == 0) {
//             // Heltec.display->setColor(BLACK);
//             display.fillCircle(96, 32, 32 - i * 3, BLACK);
//         }
//         // Heltec.display->fillCircle(96, 32, 32 - i* 3);
//     }
// }

// void setup() {
    
//     Wire.setPins(17, 18);
//     Wire.begin(1);
    
//     // Wire.begin(0);
//     bool res = display.begin(SSD1306_SWITCHCAPVCC, 0x3D, true, true);
//     // Heltec.begin(true /*DisplayEnable Enable*/, false /*LoRa Disable*/, true /*Serial Enable*/);
//     // Heltec.display->init();
//     // display.setFont()
//     // Heltec.display->setFont(ArialMT_Plain_10);
    
//     // Heltec.LoRa.available();
    
//     // // Heltec.display->clear(); // Clear buffer
//     // display.clearDisplay();
    
//     drawCircleDemo(); // Draws image
//     display.display();
//     // Heltec.display->display(); // Load image onto screen
//     pinMode(48, OUTPUT);
//     digitalWrite(48, res);
// }

// void loop() {
//     // digitalWrite(48, HIGH);
//     drawCircleDemo(); // Draws image
//     display.display();
//     delay(100);
// }