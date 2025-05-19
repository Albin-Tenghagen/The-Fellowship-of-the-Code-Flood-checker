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
#include <WiFi.h>

#include "fellowship_wifi_config.h"

namespace fellowshipWiFi
{
    static WiFiClient client{};
    
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
    bool sendRequest(IPAddress host, uint32_t port, String endpoint, String data);

    /**
     * @brief Wait for data to be recieved.
     * 
     * @param buffer 
     * @returns true if succeeded 
     */
    bool recieveData(String &buffer);
} 


#endif