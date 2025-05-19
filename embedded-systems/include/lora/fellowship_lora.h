/**
 * @file fellowship_lora.h
 * @author Love Lindeborg (love.lindeborg@chasacademy.se)
 * @brief This is the wrapper for RadioLib SX1262 LoRa module.
 * @version 0.1
 * @date 2025-05-19
 * 
 * @copyright Copyright (c) 2025
 * 
*/

#ifndef WIZARD_LORA
#define WIZARD_LORA

#include <RadioLib.h>

#include "fellowship_lora_config.h"

namespace fellowshipLoRa {

    /**
     * @brief This variable stores flags relevant to LoRa. 
     * @warning Do not use.
     */
    static struct LoRaFlags {
        bool was_init = false;
    } flags;

    /**
     * @brief Stores error codes from all functions which are called from within this namespace. Is RADIOLIB_ERR.
     * @warning Do not set, read only
     */
    static int16_t error_flag = RADIOLIB_ERR_NONE;

    /**
     * @brief Stores a human readable version of the error code, however, it is more generic.
     * @warning Do not set.
     */
    static String error_msg;

    /**
     * @brief LoRa device, default pins and other configuration options is located in "fellowship_lora_config.h"
     */
    static SX1262 *device;

    /**
     * @brief Initializes LoRa so it can be used by other functions. Uses `LORA_NSS`, `LORA_DIO1`, `LORA_RST`, and `LORA_BUSY` 
     * @returns RADIOLIB_ERR (int16_t)
     */
    int16_t init();

    /**
     * @brief Checks if library was initialized.
     * 
     * @returns true if library was initialized
     */
    bool wasInit();
    
    /**
     * @brief Reads a message from LoRa. This function is blocking.
     * 
     * @param buffer String to write message to
     * @returns RADIOLIB_ERR (int16_t). On timeout function returns `RADIOLIB_ERR_RX_TIMEOUT`
     */
    int16_t read(String &buffer);

    /**
     * @brief Reads a message from LoRa but unlike `read(String&)` does not return a timeout. This function is blocking.
     * 
     * @param buffer String to write message to
     * @returns RADIOLIB_ERR (int16_t). On timeout function returns `RADIOLIB_ERR_RX_TIMEOUT`
     */
    int16_t readUntilValueRecv(String &buffer);

    /**
     * @brief Converts `value` to two 8-bit values and writes message to LoRa.
     * 
     * @param value Value to be converted to two 8-bit values.
     * @returns RADIOLIB_ERR (int16_t).
     */
    int16_t write(int16_t value);

    /**
     * @brief Transmits a string using LoRa. 
     * 
     * @param msg String to be transmitted.
     * @returns RADIOLIB_ERR (int16_t).
     */
    int16_t write(String &msg);

    /**
     * @brief Converts two 8 bit values to a 16 bit value
     * 
     * @param higherBits Higher bits of the 16 bit variable
     * @param lowerBits Lower bits of the 16 bit variable
     * @return uint16_t result of calculation (higherBits << 8 + lowerBits)
     */
    uint16_t convertToInt16(uint8_t higherBits, uint8_t lowerBits);
};

#endif
