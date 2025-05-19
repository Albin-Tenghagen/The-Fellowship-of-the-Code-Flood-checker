#include "lora/fellowship_lora.h"

int16_t fellowshipLoRa::init() 
{	
	// Initializes device as a SX1262 module. 
	device = new SX1262(new Module ( LORA_NSS, LORA_DIO1, LORA_RST, LORA_BUSY ));

	// Init device with the correct frequency.
	error_flag = device->begin(LORA_FREQUENCY);
	if (error_flag != RADIOLIB_ERR_NONE)
	{
		error_msg = "Unable to initialize LoRa device";
		flags.was_init = false;
		return false;
	}
	else
	{
		flags.was_init = true;
		error_msg = "Successfully initialized lora!";
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

	// Blocking, returns RADIOLIB_ERR_RX_TIMEOUT on timeout.
	error_flag = device->receive(buffer);

	return error_flag;
}

int16_t fellowshipLoRa::readUntilValueRecv(String &buffer)
{
	if (!was_init())
	{
		error_flag = RADIOLIB_ERR_UNKNOWN;
		error_msg = "LoRa was not initialized";
		return false;
	}

	String msg;

	// Blocking, if recieve returns RADIOLIB_ERR_RX_TIMEOUT the loop continues to wait for something else.
	while ((error_flag = device->receive(buffer)) == RADIOLIB_ERR_RX_TIMEOUT);

	return error_flag;
}

int16_t fellowshipLoRa::write(String &msg)
{
	if (!was_init())
	{
		error_msg = "LoRa was not initialized";
		return false;
	}

	// Transmits message
	error_flag = device->transmit(msg);

	return device->transmit(msg);
}

int16_t fellowshipLoRa::write(int16_t value)
{
	// Converts int16_t to two uint8_t so it can be sent as a string. Probably overcomplicated ngl.
	char msg[] = { (uint8_t) (value >> 8), (uint8_t) (value), 0 };

	String str { msg };
	return write(str);
}

int16_t fellowshipLoRa::was_init()
{
	return flags.was_init;
}

uint16_t fellowshipLoRa::convertToInt16(uint8_t higherBits, uint8_t lowerBits)
{
	return (((uint16_t) higherBits) << 8) | lowerBits;
	
}