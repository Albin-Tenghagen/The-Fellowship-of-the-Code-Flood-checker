// #include <Arduino.h>
// #include <WiFi.h>

// #include "fellowship_lora.h"

// void setup()
// {   
// 	WiFi.config(
// 		IPAddress{192, 168, 8, 4},			// IP
//         IPAddress{192, 168, 8, 1},			// Gateway
//         IPAddress{255, 255, 255, 0}			// Subnet mask
//     );
	
// 	WiFi.setHostname("Thingy smoll");
	
// 	WiFi.begin(getenv("SSID"), getenv("PASSPHRASE"));

// 	// Serial.flush();
//     // For some reason this begin(9600) prints random gibberish when pressing reset. But when using baud-rate 115200 it shows data about the module.
//     Serial.begin(9600);
//     while (!Serial);

//     FellowshipLoRa::init();

//     if (!FellowshipLoRa::wasInit() || FellowshipLoRa::errorFlag != RADIOLIB_ERR_NONE) 
//     {
//         Serial.println(FellowshipLoRa::errorMsg);
//         return;
//     }

//     String msg;
//     FellowshipLoRa::read(msg);

//     Serial.print("Message recv");
//     Serial.println(msg);
// }

// void loop()
// {
//     // delay(1000);
//     // Serial.print("Msg");
// }