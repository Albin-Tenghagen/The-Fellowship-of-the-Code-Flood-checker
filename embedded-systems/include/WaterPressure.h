#ifndef WATERPRESSURE
#define WATERPRESSURE

#include <Arduino.h>

namespace WaterPressure
{
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

        WaterPressureSensor(uint8_t _SENSOR_PIN);
        ~WaterPressureSensor();
    };
    
    void readWaterLevel(WaterPressureSensor& sensor_object);
}

#endif