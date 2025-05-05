#include "fellowship_lora.h"



bool FellowshipLoRa::init() {
	device = new Module{ LORA_NSS, LORA_DIO1, LORA_RST, LORA_BUSY };

	if (!device.begin(LORA_FREQUENCY, LORA_BANDWIDTH))
	{
		errorMsg = "Unable to initialize LoRa device";
		return false;
	}

	return flags.wasInit = true;
}

bool FellowshipLoRa::read(String &buffer)
{
	device.readData();
}