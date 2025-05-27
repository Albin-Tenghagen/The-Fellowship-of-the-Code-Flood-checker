import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [tipsData, setTipsData] = useState([]);
  const [infrastructureData, setInfrastructureData] = useState([]);
  const [monitoringData, setMonitoringData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Function to load mock data for testing
  const loadMockData = () => {
    console.log("Loading mock data for testing");
    const mockMonitoringData = [
      {
        "id": 1001,
        "timestamp": "18/4-25",
        "airPressure": 32,
        "soilMoisture": 52,
        "temperature": 14,
        "humidity": 43,
        "pressureLevel": 53,
        "ultraSoundLevel": 4
      }
    ];
    
    setMonitoringData(mockMonitoringData);
    setLoading(false);
    setError(null);
  };
  
  // Convert infrastructure data to a format compatible with monitoring cards
  const convertInfraToMonitoring = (infraData) => {
    if (!infraData || !Array.isArray(infraData) || infraData.length === 0) {
      return [];
    }
    
    // Map infrastructure data to monitoring format
    return infraData.map(item => {
      // Generate random sensor values based on the infrastructure ID
      // This is just for visualization purposes
      const id = parseInt(item.id) || 1000;
      
      return {
        id: item.id,
        timestamp: item.timestamp,
        // Create mock sensor values derived from the infrastructure data
        temperature: 15 + (id % 10),
        humidity: 40 + (id % 20),
        airPressure: 980 + (id % 50),
        soilMoisture: 50 + (id % 30),
        pressureLevel: 45 + (id % 25),
        ultraSoundLevel: 2 + (id % 5) / 2,
        // Keep the original infrastructure data too
        problem: item.problem,
        location: item.location || "Unknown",
        status: item.status || "Pending"
      };
    });
  };
  
  const fetchData = async () => {
    try {
      console.log("Fetching data from API...");
      setLoading(true);
      setError(null);
      
      // First try to get the infrastructure data
      try {
        const infraRes = await fetch("http://localhost:5001/admins/authenticated/infrastructureIssues");
        
        if (!infraRes.ok) {
          throw new Error(`Infrastructure API failed with status ${infraRes.status}`);
        }
        
        const infraJson = await infraRes.json();
        console.log('Raw infrastructure data:', infraJson);
        
        // Extract the infrastructure data from the response
        let extractedInfraData = [];
        
        if (infraJson && infraJson.data && Array.isArray(infraJson.data)) {
          extractedInfraData = infraJson.data;
        } else if (Array.isArray(infraJson)) {
          extractedInfraData = infraJson;
        }
        
        setInfrastructureData(extractedInfraData);
        
        // If we have infrastructure data, convert it to a format for monitoring
        if (extractedInfraData.length > 0) {
          const convertedData = convertInfraToMonitoring(extractedInfraData);
          console.log('Using converted infrastructure data for monitoring:', convertedData);
          setMonitoringData(convertedData);
        } else {
          // If no infrastructure data, try the monitoring endpoint
          throw new Error('No infrastructure data available');
        }
      } catch (infraErr) {
        console.warn('Infrastructure data error, trying monitoring endpoint:', infraErr);
        
        // Try the monitoring endpoint
        try {
          const monitoringRes = await fetch("http://localhost:5001/admins/authenticated/monitoring");
          
          if (!monitoringRes.ok) {
            throw new Error(`Monitoring API failed with status ${monitoringRes.status}`);
          }
          
          const monitoringJson = await monitoringRes.json();
          console.log('Raw monitoring data:', monitoringJson);
          
          // Process the monitoring data
          if (monitoringJson && monitoringJson.data && Array.isArray(monitoringJson.data)) {
            if (monitoringJson.data.length > 0) {
              setMonitoringData(monitoringJson.data);
            } else {
              console.log('Monitoring data array is empty, using mock data');
              loadMockData();
            }
          } else {
            console.log('Monitoring data not in expected format, using mock data');
            loadMockData();
          }
        } catch (monitoringErr) {
          console.error('Both infrastructure and monitoring endpoints failed:', monitoringErr);
          loadMockData();
        }
      }
      
      // Try to get tips data separately
      try {
        const tipsRes = await fetch("http://localhost:5001/users/tips");
        
        if (tipsRes.ok) {
          const tips = await tipsRes.json();
          setTipsData(Array.isArray(tips) ? tips : []);
        }
      } catch (tipsErr) {
        console.warn('Error fetching tips:', tipsErr);
      }
      
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message || "Something went wrong while fetching data.");
      loadMockData(); // Fall back to mock data
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const refetchData = () => {
    fetchData();
  };
  
  // Create a value object with all the context data
  const contextValue = {
    tipsData,
    infrastructureData,
    monitoringData,
    refetchData,
    loadMockData,
    loading,
    error,
    setMonitoringData,
  };
  
  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useAppData must be used within a DataProvider.");
  }
  return context;
};