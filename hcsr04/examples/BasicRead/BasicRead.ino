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
    hcsr04::begin(9, 10);
    // Enable mock mode so simulated distances are used instead of real hardware
    hcsr04::setMockMode(false);

    // Option 1: Automatically set a baseline value when starting the sensor
    hcsr04::setBaselineFromCurrentReading();

    // Option 2: Manually set a baseline value (example: = 43.0)
    // hcsr04::setBaseline(0.0); // You can update this any time dynamically
}

void loop()
{
    float distance = hcsr04::readDistance();
    float delta = hcsr04::readRelativeToBaseline();
    float meter = distance / 100.0;

    if (distance >= 380.0)
    {
        Serial.println("Out of range");
    }
    else
    {
        Serial.print("Distance: ");
        Serial.print(distance, 1);
        Serial.print(" cm\t");

        Serial.print(meter, 2);
        Serial.print(" m\t");

        Serial.print("Delta: ");
        if (delta >= 0)
            Serial.print("+");
        Serial.print(delta, 1);
        Serial.println(" cm from baseline");
    }

    delay(1000);
}