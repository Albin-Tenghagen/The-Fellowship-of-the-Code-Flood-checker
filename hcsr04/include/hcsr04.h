#ifndef HCSR04_H
#define HCSR04_H

#include <Arduino.h>

namespace hcsr04
{
    struct SensorConfig
    {
        uint8_t trig_pin;
        uint8_t echo_pin;
        float calibration_offset_cm;
    };

    extern SensorConfig config;

    void begin(uint8_t trig_pin, uint8_t echo_pin);
    void setMockMode(bool enable);
    void setMockDuration(unsigned long duration_us);
    float readDistance(); // returns distance in cm
    void calibrateZero(float known_level_cm);
    void setBaselineFromCurrentReading();
    float readRelativeToBaseline();
    void setBaseline(float cm);
    unsigned long simulateEchoDurationFromCM(float cm); // used only in mock mode
}

#endif