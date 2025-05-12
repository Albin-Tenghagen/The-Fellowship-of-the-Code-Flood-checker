#include <Arduino.h>
#include <hcsr04.h>

// Values used for somewhat realistic simulation
float test_values_cm[] = {25.0, 27.0, 28.5, 30.0, 32.0, 34.0, 36.5, 38.0, 40.0, 42.0, 44.5, 46.0, 48.0, 50.0};
const int num_values = sizeof(test_values_cm) / sizeof(test_values_cm[0]);
int current_index = 0;

unsigned long last_log_time = 0;
const unsigned long log_interval = 10000; // Simulates every 10 seconds rather than every 30 minutes

void setup()
{
    Serial.begin(9600);

    // Enable mock mode so simulated distances are used instead of real hardware
    hcsr04::setMockMode(true);
}

void loop()
{
    unsigned long now = millis();
    if (now - last_log_time >= log_interval)
    {
        last_log_time = now;

        float cm = test_values_cm[current_index];
        unsigned long simulated_duration = hcsr04::simulateEchoDurationFromCM(cm);
        hcsr04::setMockDuration(simulated_duration);

        float result_cm = hcsr04::readDistance();
        Serial.print("Simulated Distance: ");
        Serial.print(result_cm, 1);
        Serial.println(" cm");

        current_index = (current_index + 1) % num_values;
    }
}