#ifndef TL136_H
#define TL136_H

#include <Arduino.h>

// Namespace
namespace tl136
{
    // Configuration struct
    struct SensorConfig
    {
        uint8_t analog_pin;
        float resistor_ohms;
        float min_voltage;
        float max_voltage;
        float max_level_m;
        float calibration_offset_m;
    };

    extern SensorConfig config;

    void begin(uint8_t analog_pin);
    void setMockMode(bool enable);
    void setMockADCValue(int value);
    float readVoltage();
    float readLevel(); // returns level in meters
    void calibrateZero(float known_level_cm); // apply offset based on known depth
    int simulateADCFromCM(float level_cm);    // convert cm to simulated ADC for testing
}

#endif