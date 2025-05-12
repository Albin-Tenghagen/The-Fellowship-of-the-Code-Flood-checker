#include "tl136.h"

namespace tl136
{
    // Configuration for the TL-136 sensor
    SensorConfig config = {
        A0,     // Analog pin
        220.0,  // Resistor in ohms used for current-to-voltage conversion
        0.88,   // Voltage at 4 mA
        4.4,    // Voltage at 20 mA
        2.0,    // Maximum measurable level in meters
        0.0     // Calibration offset (added to result after conversion)
    };

    bool mock_mode = false;        // Toggle mock mode (2nd point to toggle is in "BasicRead.ino" line: 17)
    int mock_adc_value = 512;      // Mock ADC value (0–1023)

    // Set the analog pin (call this in setup)
    void begin(uint8_t analog_pin)
    {
        config.analog_pin = analog_pin;
    }

    // Enable or disable mock mode
    void setMockMode(bool enable)
    {
        mock_mode = enable;
    }

    // Provide a simulated ADC value to be used when mock mode is enabled
    void setMockADCValue(int value)
    {
        mock_adc_value = constrain(value, 0, 1023);
    }

    // Read the voltage based on ADC input (real or simulated)
    float readVoltage()
    {
        int raw = mock_mode ? mock_adc_value : analogRead(config.analog_pin);
        return (raw / 1023.0) * 5.0;
    }

    // Convert voltage to level in meters, including calibration offset
    float readLevel()
    {
        float voltage = readVoltage();
        float level = ((voltage - config.min_voltage) / (config.max_voltage - config.min_voltage)) * config.max_level_m;
        level = constrain(level, 0.0, config.max_level_m);
        return level + config.calibration_offset_m;
    }

    // Calibrate the sensor by providing the known real-world level (in cm)
    void calibrateZero(float known_level_cm)
    {
        float current_level_m = readLevel();
        float known_m = known_level_cm / 100.0;
        config.calibration_offset_m = known_m - current_level_m;
    }

    // Converts a desired water level in cm to the simulated ADC value that the sensor would output at that depth (used only for mock testing)
    int simulateADCFromCM(float level_cm)
    {
        float level_m = level_cm / 100.0;
        float voltage = config.min_voltage + (level_m / config.max_level_m) * (config.max_voltage - config.min_voltage);
        int adc = (voltage / 5.0) * 1023.0;
        return constrain(adc, 0, 1023);
    }
}