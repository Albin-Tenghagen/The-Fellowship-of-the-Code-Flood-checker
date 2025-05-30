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


bool fellowshipWiFi::sendRequest(IPAddress host, uint32_t port, String endpoint, String data)
{
    std::vector<String> headers;

    
    headers.push_back(String("POST ") + endpoint + String(" HTTP/1.1"));
    headers.push_back(String("Host: ") + host.toString());
    headers.push_back(String("User-Agent: Heltec-Board"));
    headers.push_back(String("Connection: close"));
    headers.push_back(String("Content-Type: application/json"));
    headers.push_back(String("Content-Length: ") + String(data.length()));
    headers.push_back("");
    headers.push_back(data);

    int status = client.connect(host, port);
    if (!status) 
    {
        Serial.print("Unable to connect to client at ");
        Serial.println(host);
        return false;
    }

    for (size_t i = 0; i < headers.size(); i++)
    {
        Serial.println(headers.at(i));
        client.println(headers.at(i));
    }

    Serial.println("Data sent to server");
    return true;
}

bool fellowshipWiFi::sendRequest(const char *host, uint32_t port, String endpoint, String data)
{
    std::vector<String> headers;
    
    headers.push_back(String("POST ") + endpoint + String(" HTTP/1.1"));
    headers.push_back(String("Host: ") + String(host));
    headers.push_back(String("User-Agent: Heltec-Board"));
    headers.push_back(String("Connection: close"));
    headers.push_back(String("Content-Type: application/json"));
    headers.push_back(String("Content-Length: ") + String(data.length()));
    headers.push_back("");
    headers.push_back(data);

    int status = client.connect(host, port);
    if (!status) 
    {
        Serial.print("Unable to connect to client at ");
        Serial.println(host);
        return false;
    }

    for (size_t i = 0; i < headers.size(); i++)
    {
        Serial.println(headers.at(i));
        client.println(headers.at(i));
    }

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


// bool fellowshipWiFi::sendLoginRequest(const char *host, uint32_t port, String endpoint)
// {
//     if (credentials.size() == 0)
//     {
//         credentials["name"] = BACKEND_USERNAME;
//         credentials["password"] = BACKEND_PASSWORD;
//         credentials["email"] = BACKEND_EMAIL;
//     }

//     String msg;

//     serializeJson(credentials, msg);
//     sendRequest(host, port, endpoint, msg);

//     recieveData(msg);

//     Serial.println(msg);
// }

bool fellowshipWiFi::sendLoginRequest(IPAddress host, uint32_t port, String endpoint, String username, String password, String email, String &result)
{
    String data = "{ \"name\": \"" + username + "\", \"password\": \"" + password + "\", \"email\": \"" + email + "\" }";
    
    sendRequest(host, port, endpoint, data);

    if (recieveData(data)) Serial.println("Data recieved!");

    result = data;


    return true;
}


    