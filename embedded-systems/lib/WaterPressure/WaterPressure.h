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
        uint16_t sensor_value;
        uint16_t depth_mm;
        uint16_t sensor_value_sum;
        uint16_t sensor_average_value;
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
}

#endif