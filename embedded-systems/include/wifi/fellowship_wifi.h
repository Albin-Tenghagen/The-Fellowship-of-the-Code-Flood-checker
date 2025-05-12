#ifndef FELLOWSHIP_WIFI_H
#define FELLOWSHIP_WIFI_H

#include <WString.h>
#include <WiFi.h>

#include "fellowship_wifi_config.h"

namespace fellowshipWiFi
{
    static WiFiClient client{};
    
    bool connectWiFi(const char *ssid, const char *passphrase, IPAddress local_ipaddr, IPAddress gateway, IPAddress subnet_mask);
    bool disconnectWiFi();

    bool sendData(HTTPMethod method, IPAddress host, uint32_t port, String endpoint);
    bool recieveData(String &buffer);
} 


#endif