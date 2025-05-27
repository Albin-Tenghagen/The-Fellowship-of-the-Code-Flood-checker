#ifndef LORA_CONFIG
#define LORA_CONFIG

// These are the pins used by the board to communicate with LoRa unit.

#define LORA_NSS 8
#define LORA_SCK 9
#define LORA_MOSI 10
#define LORA_MISO 11
#define LORA_RST 12
#define LORA_BUSY 13
#define LORA_DIO1 14

// If `IS_SERVER` is set to `1` the device will act as a server and collect data from other slaves. Otherwise it will send data to master
#define LORA_IS_SERVER               1 

// The frequency in MHz to broadcast data. 
#define LORA_FREQUENCY               434

// Bandwidth in kHz
#define LORA_BANDWIDTH               125

// Output strength in dBm, used for debugging.
#define LORA_OUTPUT_STRENGTH_DBG     -9

#endif