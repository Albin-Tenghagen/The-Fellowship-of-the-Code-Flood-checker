#include "fellowship_lora.h"

bool FellowshipLoRa::init() {

	if (!device.begin(LORA_FREQUENCY, LORA_BANDWIDTH))
	{
		errorMsg = "Unable to initialize LoRa device";
		return false;
	}
	
	#if (!LORA_IS_SERVER)
		errorFlag = device.startReceive();
		flags.transmitAsLastOperation = false;
	#endif

	return flags.wasInit = true;
}

bool FellowshipLoRa::read(String &buffer)
{
	if (!wasInit())
	{
		errorMsg = "LoRa was not initialized";
		return false;
	}

	errorFlag = device.startReceive();
	flags.transmitAsLastOperation = false;

	device.setDio1Action(setFlag);

    while (!flags.shouldRead);

	if (errorFlag == RADIOLIB_ERR_NONE) {
		device.readData(buffer);
		return true;
	}

	return false;
}

bool FellowshipLoRa::write(String &msg)
{
	if (!wasInit())
	{
		errorMsg = "LoRa was not initialized";
		return false;
	}

	device.startTransmit(msg);

	return true;
}

void FellowshipLoRa::setFlag()
{
	flags.shouldRead = true;
}

bool FellowshipLoRa::wasInit()
{
	return flags.wasInit;
}