#ifndef WIZARD_LORA
#define WIZARD_LORA

#include <RadioLib.h>

#include "fellowship_lora_config.h"

namespace fellowshipLoRa {

    static struct LoRaFlags {
        bool transmit_flag = false;
        bool was_init = false;
        bool is_server = false;
    } flags;

    static int16_t error_flag = RADIOLIB_ERR_NONE;
    static String error_msg;

    static SX1262 *device;

    int16_t init();
    int16_t was_init();
    
    int16_t read(String &buffer);
    int16_t write(int16_t value);
    int16_t write(String &msg);
};

#endif
