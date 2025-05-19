#include "wifi/fellowship_wifi.h"
#include <WiFi.h>
#include <json_parser.h>

#include <vector>

#include "wifi/secrets.h"

bool fellowshipWiFi::connectWiFi(IPAddress local_ipaddr, IPAddress gateway, IPAddress subnet_mask)
{
    WiFi.config(
        local_ipaddr,
        gateway,
        subnet_mask, 
        IPAddress{1, 1, 1, 1}
    );

    WiFi.begin(SSID, PASSPHRASE);
    
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


bool fellowshipWiFi::sendRequest(IPAddress host, uint32_t port, String endpoint, String data)
{
    int status = client.connect(host, port);
    if (!status) 
    {
        Serial.print("Unable to connect to client at ");
        Serial.println(host);
        return false;
    }

    std::vector<String> headers;

    
    headers.push_back(String("POST ") + endpoint + String(" HTTP/1.1"));
    headers.push_back(String("Host: ") + host.toString());
    headers.push_back(String("User-Agent: Heltec-Board"));
    headers.push_back(String("Connection: keep-alive"));
    headers.push_back(String("Keep-Alive: timeout=5"));
    headers.push_back(String("Content-Type: application/json"));
    headers.push_back(String("Content-Length: " + data.length()));
    headers.push_back("");
    headers.push_back(data);


    for (size_t i = 0; i < headers.size(); i++)
    {
        Serial.println(headers.at(i));
        client.println(headers.at(i));
    }

    client.println();
    client.stop();

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
