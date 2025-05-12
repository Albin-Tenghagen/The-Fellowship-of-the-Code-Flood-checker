#include "wifi/fellowship_wifi.h"
#include <WiFi.h>

bool fellowshipWiFi::connectWiFi(const char *ssid, const char *passphrase, IPAddress local_ipaddr, IPAddress gateway, IPAddress subnet_mask)
{
    WiFi.config(
        local_ipaddr,
        gateway,
        subnet_mask, 
        IPAddress{1, 1, 1, 1}
    );

    WiFi.begin(ssid, passphrase);
    
    uint8_t status = WiFi.waitForConnectResult();
    if (status != wl_status_t::WL_CONNECTED)
    {
        Serial.println("Unable to connect to WiFi...");
        return false;
    }

    Serial.println("Connected to WiFi");

    return true;
}

bool fellowshipWiFi::disconnectWiFi()
{
    bool result = WiFi.disconnect();
    
    if (!result) Serial.println("Unable to disconnect from WiFi");
    return result;
}


bool fellowshipWiFi::sendData(HTTPMethod method, IPAddress host, uint32_t port, String endpoint)
{
    int status = client.connect(host, port);
    if (!status) 
    {
        Serial.print("Unable to connect to client at ");
        Serial.println(host);
        return false;
    }

    String header[3];
    switch (method)
    {
    case GET:   
        header[0] = String("GET ") + endpoint + String(" HTTP/1.1");
        break;
    case POST:
        header[0] = String("POST ") + endpoint + String(" HTTP/1.1");
        break;
    default:
        break;
    }

    header[1] = String("Host: ") + host;
    header[2] = String("Connection: close");

    for (size_t i = 0; i < 3; i++)
    {
        client.println(header[i]);
    }

    client.println();

    Serial.println("Data sent to server");
    return true;
}

bool fellowshipWiFi::recieveData(String &buffer)
{
    if (!client.connected() && !client.available()) return false;
    
    while (client.connected() || client.available())
    {
        if (client.available())
        {
            buffer += client.readString();
        }
    }

    return true;
}
