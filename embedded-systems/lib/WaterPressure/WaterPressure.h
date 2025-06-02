#ifndef WATERPRESSURE
#define WATERPRESSURE

#include <Arduino.h>

/**
 * @brief Namespace for the Submersible Water Level Sensor library
 * 
 */
namespace WaterPressure
{
    /**
     * @brief Submersible Water Level Sensor object
     * 
     */
    class WaterPressureSensor
    {
    private:
        /* data */
    public:

        uint32_t sensor_value_sum;
        int16_t sensor_average_value;
        uint16_t sensor_value;
        int16_t depth_cm;
        int16_t baseline_cm;
      
        const uint8_t SENSOR_PIN;
        const uint8_t MEASURING_POINTS;

        /**
         * @brief Construct a new Water Pressure Sensor object
         * 
         * @param _SENSOR_PIN Analog pin to read sensor values from
         */
        WaterPressureSensor(uint8_t _SENSOR_PIN);
        ~WaterPressureSensor();
    };
    
    /**
     * @brief Reads values from the sensor 50 times over 5 seconds and makes an average
     * 
     * @param sensor_object 
     */
    void readWaterLevel(WaterPressureSensor& sensor_object);
    
    /**
     * @brief Creates a baseline to calculate future deviations from
     * 
     * @param MEASURING_POINTS Number of measuring points 
     * @param sensor_value_sum Sum of sensor readings
     * @param SENSOR_PIN Sensor pin
     * @param sensor_value Momentary sensor reading
     * @param baseline_cm Baseline in cm
     */
    void createBaseline(WaterPressureSensor& sensor_object);
}

#endif