#include "lora/fellowship_lora.h"

bool FellowshipLoRa::init() {

	if (!device.begin(LORA_FREQUENCY, LORA_BANDWIDTH))
	{
		error_msg = "Unable to initialize LoRa device";
		return false;
	}
	
	device.setDio1Action(setFlag);

	#if (!LORA_IS_SERVER)
		errorFlag = device.startReceive();
		flags.transmitAsLastOperation = false;
	#endif

	return flags.was_init = true;
}

bool FellowshipLoRa::read(String &buffer)
{
	if (!was_init())
	{
		error_msg = "LoRa was not initialized";
		return false;
	}

	error_flag = device.startReceive();
	flags.transmit_as_last_operation = false;


    while (!flags.should_read)
	{
		device.readData(buffer);
	}

	if (error_flag == RADIOLIB_ERR_NONE) {
		return true;
	}

	return false;
}

bool FellowshipLoRa::write(String &msg)
{
	if (!was_init())
	{
		error_msg = "LoRa was not initialized";
		return false;
	}

	device.startTransmit(msg);

	return true;
}

void FellowshipLoRa::setFlag()
{
	flags.should_read = true;
}

bool FellowshipLoRa::was_init()
{
	return flags.was_init;
}