#include "lora/fellowship_lora.h"

int16_t fellowshipLoRa::init() 
{	
	Serial.println("Initializing ... ");
	device = new SX1262(new Module ( LORA_NSS, LORA_DIO1, LORA_RST, LORA_BUSY ));
	error_flag = device->begin(868);
	if (error_flag != RADIOLIB_ERR_NONE)
	{
		error_msg = "Unable to initialize LoRa device";
		flags.was_init = false;
		return false;
	}
	else
	{
		flags.was_init = true;
		Serial.println("Successfully initialized lora!");
	}

	return error_flag;
}

int16_t fellowshipLoRa::read(String &buffer)
{
	if (!was_init())
	{
		error_flag = RADIOLIB_ERR_UNKNOWN;
		error_msg = "LoRa was not initialized";
		return false;
	}

	String msg;
	error_flag = device->receive(msg);
	Serial.println(error_flag);

	return error_flag;
}

int16_t fellowshipLoRa::write(String &msg)
{
	if (!was_init())
	{
		error_msg = "LoRa was not initialized";
		return false;
	}

	error_flag = device->transmit(msg);
	Serial.println(error_flag);

	return device->transmit(msg);
}

int16_t fellowshipLoRa::was_init()
{
	return flags.was_init;
}