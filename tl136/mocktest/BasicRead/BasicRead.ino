#include <Arduino.h>
#include <tl136.h>

// Test values for simulation
float test_values_cm[] = {25.0, 27.0, 29.5, 30.0, 31.2, 32.0, 33.8, 35.0, 36.1, 37.0, 38.5, 40.0, 42.3, 44.0, 45.7, 47.5, 48.3, 49.2, 50.0};
const int num_values = sizeof(test_values_cm) / sizeof(test_values_cm[0]);
int current_index = 0;

unsigned long last_log_time = 0;
const unsigned long log_interval = 10000; // Simulate 10 seconds rather than 30 minutes...

void setup()
{
    Serial.begin(9600);
    
    // Enable mock mode so the simulated data above is used instead of the real sensor input (2nd point to toggle is in "tl136.cpp" line: 15)
    tl136::setMockMode(true);
}

void loop()
{
    unsigned long now = millis();
    if (now - last_log_time >= log_interval)
    {
        last_log_time = now;

        // Get simulated cm value and convert to ADC for testing
        float cm = test_values_cm[current_index];
        int adc_value = tl136::simulateADCFromCM(cm);
        tl136::setMockADCValue(adc_value);

        float level_cm = tl136::readLevel() * 100.0; // Convert from meters to cm
        Serial.print("Simulated Level: ");
        Serial.print(level_cm, 1);
        Serial.println(" cm");

        current_index = (current_index + 1) % num_values;
    }
}