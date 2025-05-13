#include "lora/fellowship_lora.h"

bool fellowshipLoRa::init(bool is_server) 
{
	if (!device.begin(LORA_FREQUENCY, LORA_BANDWIDTH))
	{
		error_msg = "Unable to initialize LoRa device";
		return false;
	}
	
	if (is_server)
	{
		flags.transmit_as_last_operation = false;
	}

	return flags.was_init = true;
}

bool fellowshipLoRa::read(String &buffer)
{
	if (!was_init())
	{
		error_msg = "LoRa was not initialized";
		return false;
	}

	flags.transmit_as_last_operation = false;

	device.receive(buffer);

	if (error_flag != RADIOLIB_ERR_NONE) {
		return false;
	}

	return true;
}

bool fellowshipLoRa::write(String &msg)
{
	if (!was_init())
	{
		error_msg = "LoRa was not initialized";
		return false;
	}

	device.startTransmit(msg);

	return true;
}

void fellowshipLoRa::setFlag()
{
	flags.should_read = true;
}

bool fellowshipLoRa::was_init()
{
	return flags.was_init;
}