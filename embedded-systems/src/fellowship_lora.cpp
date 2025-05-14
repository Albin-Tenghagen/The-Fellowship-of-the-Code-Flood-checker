#include "lora/fellowship_lora.h"

bool fellowshipLoRa::init() 
{	
	Serial.println("Initializing ... ");
	error_flag = device.begin(868);
	if (error_flag != RADIOLIB_ERR_NONE)
	{
		error_msg = "Unable to initialize LoRa device";
		return false;
	}
	else
	{
		Serial.println("Success!");
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

	String msg;
	error_flag = device.receive(msg);

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

	error_flag = device.transmit(msg);

	return error_flag == RADIOLIB_ERR_NONE;
}

bool fellowshipLoRa::was_init()
{
	return flags.was_init;
}