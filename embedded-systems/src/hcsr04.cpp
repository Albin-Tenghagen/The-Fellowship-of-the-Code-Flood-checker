#include "hcsr04.h"

namespace hcsr04
{
    SensorConfig config = {
        20,  // trig
        19, // echo
        0.0 // calibration offset in cm
    };

    bool mock_mode = false;
    unsigned long mock_duration = 580; // Default to 10 cm (10 * 58)

    void begin(uint8_t trig_pin, uint8_t echo_pin)
    {
        config.trig_pin = trig_pin;
        config.echo_pin = echo_pin;
        pinMode(trig_pin, OUTPUT);
        pinMode(echo_pin, INPUT);
    }

    void setMockMode(bool enable)
    {
        mock_mode = enable;
    }

    void setMockDuration(unsigned long duration_us)
    {
        mock_duration = duration_us;
    }

    float readDistance()
    {
        unsigned long duration;

        if (mock_mode)
        {
            duration = mock_duration;
        }
        else
        {
            // Send 10 µs HIGH pulse on trigger pin
            digitalWrite(config.trig_pin, LOW);
            delayMicroseconds(2);
            digitalWrite(config.trig_pin, HIGH);
            delayMicroseconds(10);
            digitalWrite(config.trig_pin, LOW);

            // Measure how long the echo pin stays HIGH
            duration = pulseIn(config.echo_pin, HIGH, 30000); // timeout at 30ms
        }

        float distance = duration / 58.0; // Convert to cm
        return distance + config.calibration_offset_cm;
    }

    void sendToLoRa(Stream &out)
    {
        float distance = readDistance();
        out.print("{\"ultraSoundLevel\": ");
        out.print(distance, 1); // 1 decimal place
        out.println("}");
    }

    void calibrateZero(float known_level_cm)
    {
        float current = readDistance();
        config.calibration_offset_cm = known_level_cm - current;
    }

    // Converts a distance in cm to the simulated echo duration (testing feature)
    unsigned long simulateEchoDurationFromCM(float cm)
    {
        return cm * 58.0;
    }
}