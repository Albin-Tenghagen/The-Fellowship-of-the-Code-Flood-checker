# LoRa Documentation

This directory is aimed at documenting different sources, required materials, networking structure etc. all relating to LoRa on the hardware side of this project.

## Sources

- [What is LoRaWan?](https://www.thethingsnetwork.org/docs/lorawan/what-is-lorawan/)
- [What is LoRa & LoRaWan?](https://www.mokosmart.com/lora-technology/)
- [Datasheet](https://cdn.sparkfun.com/assets/7/7/3/2/2/SX1276_Datasheet.pdf)
- [Library which could be used](https://github.com/sandeepmistry/arduino-LoRa)
- [Guide to Heltek board](https://github.com/HelTecAutomation/Heltec_ESP32)

## Laws

- https://fbradio.se/info/vad-sager-lagen-om-komradio-och-radiokommunikation/
- [LPD scannersverige](https://scannersverige.se/frekvenser-lpd-433-mhz/)
- [LPD Wikipedia](https://en.wikipedia.org/wiki/LPD433)
- [CEPT](https://cept.org/cept/cept-country-codes)
- [Excel, Post- och telestyrelsen](https://pts.se/radio/spektrumforvaltning/inriktningsplan-for-spektrumhantering-excel/)
- [Frekvensplanen](https://frekvensplanen.pts.se/)

## OLED

- [Examples](https://github.com/HelTecAutomation/Heltec_ESP32/blob/master/examples/OLED/)
- [Simple demo](https://github.com/HelTecAutomation/Heltec_ESP32/blob/master/examples/OLED/SimpleDemo/SimpleDemo.ino)

## LoRa

- [Ping Pong](https://github.com/HelTecAutomation/Heltec_ESP32/blob/master/examples/LoRaBasic/pingpong/pingpong.ino)
- [RadioLib](https://github.com/jgromes/RadioLib)

## Research

The code can not really be tested without hardware and there are a lack of LoRa simulators (no SPICE).

### 2025-04-07

One thing that I noticed during research is that there is a lack of easily accessable documentation for the DollaTek brand. I have not been able to find any documentation today.

### 2025-04-14

This session I have researched laws and frequencies we will be able to use without needing a licens. According to Wikipedia we should be able to use the LPD433 band (433.05 MHz). This band is used for Low Power Devices which fits our description and use-case. This band is license free in countries which are part of CEPT, which in this case includes Sweden.

Other frequenzies that could be utilized are 863-868 MHz. Which according to PTS (Post- och Telestyrelsen, swedish post and telecommittee) does not require a licens to utilize. We will, however stick to using 433.05 MHz since it has longer distance than the 868 MHz band.

### 2025-04-28

The problem today has been that LoRa does not initialize. I have tried to use different solutions but when using `Heltec.LoRa.begin()` the program freezes and when using `Heltec.begin()` the OLED states that LoRa failed to initialize. I have not figured out why this happens. 

### 2025-05-05

I have started using RadioLib and this seems to have solved the problem.

### 2025-05-19

Most code now works and documentation has been added. Both to code snippets and function explanations using doxygen. It also seems the boards have support for the LoRa band 434 so it can be used instead of 868 since it takes less power.  