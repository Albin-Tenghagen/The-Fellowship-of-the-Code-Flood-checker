#include "fellowship_wifi.h"
#include <WiFi.h>
#include <json_parser.h>

#include <vector>

#include "secrets.h"

bool fellowshipWiFi::connectWiFi()
{
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

bool fellowshipWiFi::connectWiFi(IPAddress local_ipaddr, IPAddress gateway, IPAddress subnet_mask)
{
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


bool fellowshipWiFi::sendRequest(IPAddress host, uint32_t port, String endpoint, String data, bool isLogin = true)
{
    std::vector<String> headers;

    
    headers.push_back(String("POST https://") + host + endpoint + String(" HTTP/1.1"));
    headers.push_back(String("Host: ") + host.toString());
    headers.push_back(String("User-Agent: Heltec-Board"));
    if (!isLogin) 
        headers.push_back(String("Authorization: Bearer ") + token.token);
    headers.push_back(String("Content-Type: application/json"));
    headers.push_back(String("Content-Length: ") + String(data.length()));
    headers.push_back(String("Connection: close"));
    headers.push_back("");
    headers.push_back(data);

    client.setCACert(sslCert);
    
    int status = client.connect(host, port);
    if (!status) 
    {
        return false;
    }

    for (size_t i = 0; i < headers.size(); i++)
    {
        client.println(headers.at(i));
    }

    return true;
}

bool fellowshipWiFi::sendRequest(const char *host, uint32_t port, String endpoint, String data, bool isLogin = true)
{
    std::vector<String> headers;
    
    headers.push_back(String("POST https://") + String(host) + endpoint + String(" HTTP/1.1"));
    headers.push_back(String("Host: ") + String(host));
    headers.push_back(String("User-Agent: Heltec-Board"));
    if (!isLogin) 
        headers.push_back(String("Authorization: Bearer ") + token.token);
    headers.push_back(String("Content-Type: application/json"));
    headers.push_back(String("Content-Length: ") + String(data.length()));
    headers.push_back(String("Connection: close"));
    headers.push_back("");
    headers.push_back(data);

    client.setCACert(sslCert);
    
    int status = client.connect(host, port);
    if (!status) 
    {
        return false;
    }

    for (size_t i = 0; i < headers.size(); i++)
    {   
        Serial.println(headers.at(i));
        if (headers.at(i).length() > 1) client.println(headers.at(i).c_str());
        else client.println();
    }

    return true;
}

bool fellowshipWiFi::recieveData(String *data, String *headers)
{
    if (!client.connected() && !client.available() && data != nullptr) return false;
    
    if (headers != nullptr) 
        *headers = "";
    *data = "";
    
    while (client.connected()) {
        String line = client.readStringUntil('\n');
        if (line == "\r") {
            break;
        }
        
        if (headers != nullptr)
            *headers += line;
    }

    while (client.available()) {
        *data = client.readString();
    }

    client.stop();

    return true;
}

bool fellowshipWiFi::recieveData(String *data)
{
    return recieveData(data, nullptr);
}

bool fellowshipWiFi::sendLoginRequest(const char *host, uint32_t port, String endpoint, String username, String password, String email)
{
    String data = "{ \"name\": \"" + username + "\", \"password\": \"" + password + "\", \"email\": \"" + email + "\" }";
    String headers;

    token.validUntil = millis() + 36000;
    sendRequest(host, port, endpoint, data);

    if (!recieveData(&data, &headers)) return false;
    
    std::vector<String> headerArr(9);

    JsonDocument json;
    deserializeJson(json, data);

    String token = json["token"].as<String>();
    Serial.printf("Token: %s\n", token.c_str());

    if (!json["token"].is<String>())
    {
        Serial.println("Token was not found!");
        return false;
    }

    fellowshipWiFi::token.token = token;

    Serial.println(fellowshipWiFi::token.token);

    return true;
}

bool fellowshipWiFi::sendLoginRequest(IPAddress host, uint32_t port, String endpoint, String username, String password, String email)
{
    String data = "{ \"name\": \"" + username + "\", \"password\": \"" + password + "\", \"email\": \"" + email + "\" }";
    String headers;
    
    token.validUntil = millis() + 36000;
    sendRequest(host, port, endpoint, data);

    if (!recieveData(&data, &headers)) return false;

    JsonDocument json;
    deserializeJson(json, data);

    if (!json["token"].is<const char *>())
    {
        Serial.println("Token was not found!");
        return false;
    }

    token.token = json["token"].as<const char *>();

    return true;
}


    