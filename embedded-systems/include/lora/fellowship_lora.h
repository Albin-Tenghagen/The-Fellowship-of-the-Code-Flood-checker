#ifndef WIZARD_LORA
#define WIZARD_LORA

#include <RadioLib.h>

#include "fellowship_lora_config.h"

namespace fellowshipLoRa {

    static struct LoRaFlags {
        bool transmit_flag = false;
        bool was_init = false;
        bool transmit_as_last_operation = true;
        bool is_server = false;
        volatile bool should_read = false;
    } flags;

    static int error_flag = RADIOLIB_ERR_NONE;
    static String error_msg;

    static SX1262 device = new Module{ LORA_NSS, LORA_DIO1, LORA_RST, LORA_BUSY };

    bool init(bool is_server = false);
    bool was_init();

    void setFlag(void);
    
    bool read(String &buffer);
    bool write(String &msg);
};

#endif
