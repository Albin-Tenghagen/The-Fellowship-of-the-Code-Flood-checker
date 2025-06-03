/**
 * @file fellowship_wifi.h
 * @author Love Lindeborg (love.lindeborg@chasacademy.se)
 * @brief Definitions for connecting to WiFi
 * @version 0.1
 * @date 2025-05-19
 * 
 * @copyright Copyright (c) 2025
 * 
 */

#ifndef FELLOWSHIP_WIFI_H
#define FELLOWSHIP_WIFI_H

#include <WString.h>
#include <ArduinoJson.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>

#include "fellowship_config.h"

namespace fellowshipWiFi
{
    static WiFiClientSecure client{};

    static const char *sslCert = SSL_CERTIFICATE;

    static struct Token {
        String token;
        uint64_t validUntil;
    } token;
    
    /**
     * @brief Connects the device to the internet. Uses SSID and PASSPHRASE from secrets.h which is not included by git.
     * 
     * @param local_ipaddr Static IPv4 address in the local network
     * @param gateway The networks gateway
     * @param subnet_mask Which networkmask to be used
     * @returns true if connection succeeded, false otherwise.
     */
    bool connectWiFi(IPAddress local_ipaddr, IPAddress gateway = {192, 168, 1, 1}, IPAddress subnet_mask = {255, 255, 255, 0});

    /**
     * @brief Connects the device to the internet using DHCP.  

     * @returns true if connection succeeded, false otherwise.
     */
    bool connectWiFi();

    /**
     * @brief Disconnects from the internet
     * 
     * @returns true if succeeded
     * @returns false if couldn't disconnect
     */
    bool disconnectWiFi();

    /**
     * @brief Sends a POST request to `host` on `port`.
     * 
     * @param host Host to send data to
     * @param port Port to send data to
     * @param endpoint Server endpoint such as /api/endpoint.
     * @param data Data to be sent, as JSON
     * @returns true if succeeded to send data.
     */
    bool sendRequest(const char *host, uint32_t port, String endpoint, String data, bool isLogin);

    /**
     * @brief Sends a POST request to `host` on `port`.
     * 
     * @param host Host to send data to
     * @param port Port to send data to
     * @param endpoint Server endpoint such as /api/endpoint.
     * @param data Data to be sent, as JSON
     * @returns true if succeeded to send data.
     */
    bool sendRequest(IPAddress host, uint32_t port, String endpoint, String data, bool isLogin);

    /**
     * @brief Wait for data to be recieved.
     * 
     * @param data Request body
     * @param headers Request headers 
     * @returns true if succeeded 
     */
    bool recieveData(String *data, String *headers);

    /**
     * @brief Wait for data to be recieved.
     * 
     * @param data Request body
     * @returns true if succeeded 
     */
    bool recieveData(String *data);

    /**
     * @brief Sends a request to the backend for loggin in.
     * 
     * @param host The host to send the request to
     * @param port The port to send the request to
     * @param endpoint The server endpoint used for authentication / login
     * @returns true if login succeeded
     * @returns false if login failed
     */
    bool sendLoginRequest(const char *host, uint32_t port, String endpoint, String username, String password, String email);
    
    /**
     * @brief Sends a request to the backend for loggin in.
     * 
     * @param host The host to send the request to
     * @param port The port to send the request to
     * @param endpoint The server endpoint used for authentication / login
     * @returns true if login succeeded
     * @returns false if login failed
     */
    bool sendLoginRequest(IPAddress host, uint32_t port, String endpoint, String username, String password, String email);
} 


#endif