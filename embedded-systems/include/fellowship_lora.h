#ifndef WIZARD_LORA
#define WIZARD_LORA

#include <RadioLib.h>

#include <fellowship_lora_config.h>

namespace FellowshipLoRa {

    struct LoRaFlags {
        bool transmitFlag = false;
        bool wasInit = false;
        volatile bool shouldRead = false;
    } flags;

    int errorFlag = RADIOLIB_ERR_NONE;
    String errorMsg;

    static SX1262 device;

    bool init();
    bool wasInit();

    void onMsg(void);
    
    bool read(String &buffer);
    bool write(const String &msg);
};

#endif
