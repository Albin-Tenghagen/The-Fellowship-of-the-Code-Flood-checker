#include <Arduino.h>
#include "SoilSensor.h"
#include "hcsr04.h"
#include <DHTSensor.h>
#include <fellowship_wifi.h>
#include <secrets.h>

//Delete these variables in the real program
unsigned long previous_reading = 0;
unsigned long interval_reading = 10000;
float HCSR04distance = 0.0;

void setup() 
{
    Serial.begin(9600);

    while (!Serial);

    // JsonDocument credentials;
 
    fellowshipWiFi::connectWiFi();


    String token;
    fellowshipWiFi::sendLoginRequest({192, 168, 8, 169}, 5001, "/admins/login", BACKEND_USERNAME, BACKEND_PASSWORD, BACKEND_EMAIL, token);

    Serial.println(token);
}

void loop() 
{

}