#ifndef WIZARD_LORA
#define WIZARD_LORA

#include <RadioLib.h>

#include "fellowship_lora_config.h"

namespace FellowshipLoRa {

    static struct LoRaFlags {
        bool transmitFlag = false;
        bool wasInit = false;
        bool transmitAsLastOperation = true;
        volatile bool shouldRead = false;
    } flags;

    static int errorFlag = RADIOLIB_ERR_NONE;
    static String errorMsg;

    static SX1262 device = new Module{ LORA_NSS, LORA_DIO1, LORA_RST, LORA_BUSY };

    bool init();
    bool wasInit();

    void setFlag(void);
    
    bool read(String &buffer);
    bool write(String &msg);
};

#endif
