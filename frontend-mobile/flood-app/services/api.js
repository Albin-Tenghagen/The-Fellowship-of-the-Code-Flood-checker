import baseUrl from "./urlConfig";

// Mock data
const mockSafetyData = {
  products: [
    {
      id: 1,
      title: "Översvämningsvarning",
      description: "Kontrollera vattennivåer och ha en evakueringsplan redo",
      category: "flood",
      priority: "critical",
      icon: "🌊"
    },
    {
      id: 2,
      title: "Källarsäkerhet",
      description: "Installera vattenlarm och backventiler för att skydda mot vattenintrång",
      category: "basement",
      priority: "high",
      icon: "💧"
    },
    {
      id: 3,
      title: "Bil i vatten",
      description: "Kör aldrig genom översvämmade områden - vänd om vid vattenhinder",
      category: "vehicle",
      priority: "critical",
      icon: "🚗"
    },
    {
      id: 4,
      title: "Nödutrustning",
      description: "Förvara ficklampa, radio och första hjälpen-kit på säker höjd",
      category: "emergency",
      priority: "high",
      icon: "🆘"
    },
    {
      id: 5,
      title: "Elstängning",
      description: "Lär dig stänga av el och vatten vid översvämningsrisk",
      category: "utilities",
      priority: "high",
      icon: "⚡"
    }
  ]
};

const mockMonitoringData = {
  data: [
    {
      id: 1,
      timestamp: "2025-05-26 10:30:15",
      temperature_c: 22.5,
      humidity_percent: 68.3,
      soil_moisture_percent: 45.2,
      water_level_pressure_cm: 125.8,
      water_level_ultrasound_cm: 1.24,
      air_pressure_hPa: 1013.2,
      sensor_location: "Trädgård A",
      battery_level: 87
    },
    {
      id: 2,
      timestamp: "2025-05-26 10:25:15",
      temperature_c: 22.1,
      humidity_percent: 69.1,
      soil_moisture_percent: 44.8,
      water_level_pressure_cm: 126.2,
      water_level_ultrasound_cm: 1.23,
      air_pressure_hPa: 1013.5,
      sensor_location: "Trädgård A",
      battery_level: 87
    },
    {
      id: 3,
      timestamp: "2025-05-26 10:20:15",
      temperature_c: 21.8,
      humidity_percent: 70.2,
      soil_moisture_percent: 43.9,
      water_level_pressure_cm: 127.1,
      water_level_ultrasound_cm: 1.22,
      air_pressure_hPa: 1013.8,
      sensor_location: "Trädgård A",
      battery_level: 86
    },
    {
      id: 4,
      timestamp: "2025-05-26 10:15:15",
      temperature_c: 21.5,
      humidity_percent: 71.0,
      soil_moisture_percent: 43.1,
      water_level_pressure_cm: 128.0,
      water_level_ultrasound_cm: 1.21,
      air_pressure_hPa: 1014.1,
      sensor_location: "Trädgård A",
      battery_level: 86
    }
  ]
};

const mockInfrastructureData = {
  infrastructureData: [
    {
      id: 1,
      title: "Server Overload - Stockholm DC",
      severity: "critical",
      status: "active",
      description: "High CPU usage detected on primary web servers",
      affectedSystems: ["Web Server", "Load Balancer"],
      reportedAt: "2025-05-26T09:15:00Z",
      estimatedResolution: "2025-05-26T12:00:00Z"
    },
    {
      id: 2,
      title: "Network Latency - Göteborg",
      severity: "warning",
      status: "investigating",
      description: "Increased response times in Göteborg region",
      affectedSystems: ["API Gateway"],
      reportedAt: "2025-05-26T08:45:00Z",
      estimatedResolution: "2025-05-26T11:30:00Z"
    },
    {
      id: 3,
      title: "Database Backup Failure",
      severity: "medium",
      status: "resolved",
      description: "Automated backup process failed last night",
      affectedSystems: ["Database", "Backup System"],
      reportedAt: "2025-05-25T23:30:00Z",
      resolvedAt: "2025-05-26T07:15:00Z"
    }
  ]
};

const mockTipsData = {
  tips: [
    {
      id: 1,
      title: "Översvämningsrisk vid snösmältning",
      content: "Håll koll på väderprognoser i mars-april när snön smälter snabbt - risk för översvämning",
      category: "varning",
      author: "Meteorolog S.",
      likes: 42,
      createdAt: "2025-05-25T14:30:00Z",
      tags: ["översvämning", "snösmältning", "varning"]
    },
    {
      id: 2,
      title: "Skydda källaren",
      content: "Installera backventiler i källarens avlopp för att förhindra att vatten strömmar tillbaka",
      category: "skydd",
      author: "Byggexpert M.",
      likes: 28,
      createdAt: "2025-05-24T19:45:00Z",
      tags: ["källare", "skydd", "backventil"]
    },
    {
      id: 3,
      title: "Flytta värdesaker högt upp",
      content: "Vid översvämningsvarning - flytta elektronik och viktiga dokument till övre våningar",
      category: "beredskap",
      author: "Försäkringsrådgivare K.",
      likes: 35,
      createdAt: "2025-05-23T11:20:00Z",
      tags: ["beredskap", "värdesaker", "skydd"]
    },
    {
      id: 4,
      title: "Kör inte genom översvämmade vägar",
      content: "Redan 30cm vatten kan lyfta en bil - vänd om och hitta alternativ väg",
      category: "säkerhet",
      author: "Trafikpolis L.",
      likes: 67,
      createdAt: "2025-05-22T16:15:00Z",
      tags: ["bilkörning", "säkerhet", "varning"]
    }
  ]
};

// Add this flag to easily switch between mock and real data
const USE_MOCK_DATA = true; // Set to false to use real API calls

export const fetchSafety = async () => {
  if (USE_MOCK_DATA) {
    console.log(":test_tube: Using mock safety data");
    return new Promise(resolve => {
      setTimeout(() => resolve(mockSafetyData.products), 500);
    });
  }

  try {
    const response = await fetch(`${baseUrl}/users/safety`);
    const text = await response.text();
    console.log(":rocket: RAW API response:", text);
    const data = JSON.parse(text);
    console.log(":white_check_mark: Parsed JSON:", data);
    return data.products ?? [];
  } catch (error) {
    console.error(":x: Fel vid hämtning av tips:", error.message);
    throw error;
  }
};

export const fetchMonitoring = async () => {
  if (USE_MOCK_DATA) {
    console.log(":test_tube: Using mock monitoring data");
    return new Promise(resolve => {
      setTimeout(() => resolve(mockMonitoringData.data), 700);
    });
  }

  try {
    const response = await fetch(`${baseUrl}/admins/authenticated/monitoring`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    console.log(":rocket: RAW monitoring response:", text);

    const data = JSON.parse(text);
    console.log(":white_check_mark: Parsed monitoring JSON:", data);

    return data.data || [];
  } catch (error) {
    console.error(":x: Error fetching monitoring data:", error.message);
    throw error;
  }
};

export const fetchInfrastructureIssues = async () => {
  if (USE_MOCK_DATA) {
    console.log(":test_tube: Using mock infrastructure data");
    return new Promise(resolve => {
      setTimeout(() => resolve(mockInfrastructureData.infrastructureData), 600);
    });
  }

  try {
    const response = await fetch(`${baseUrl}/admins/authenticated/infrastructureIssues`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    console.log(":rocket: RAW infrastructure response:", text);

    const data = JSON.parse(text);
    console.log(":white_check_mark: Parsed infrastructure JSON:", data);
    return data.infrastructureData || [];
  } catch (error) {
    console.error(":x: Error fetching infrastructure issues:", error.message);
    throw error;
  }
};

export const postTip = async (tipData) => {
  if (USE_MOCK_DATA) {
    console.log(":test_tube: Using mock post tip response");
    console.log(":rocket: Mock posting tip data:", tipData);

    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Tip submitted successfully",
          id: Date.now(),
          tip: {
            ...tipData,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            likes: 0,
            author: "Du"
          }
        });
      }, 800);
    });
  }

  try {
    console.log(":rocket: Posting tip data:", tipData);
    console.log(`:rocket: POST request to ${baseUrl}/users/tips/postTip`);

    const response = await fetch(`${baseUrl}/users/tips/postTip`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tipData),
    });

    console.log(":rocket: Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`:x: Server responded with ${response.status}: ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const text = await response.text();
    console.log(":rocket: RAW API response for posting tip:", text);

    if (!text) {
      console.log(":warning: Server returned empty response");
      return { success: true, message: "Tip submitted successfully" };
    }

    let data;
    try {
      data = JSON.parse(text);
      console.log(":white_check_mark: Parsed JSON response:", data);
      return data;
    } catch (e) {
      console.log(":warning: Response is not JSON, returning raw text");
      return { success: true, message: text };
    }
  } catch (error) {
    console.error(':x: Error posting tip:', error);
    throw error;
  }
};

export const fetchTips = async () => {
  if (USE_MOCK_DATA) {
    console.log(":test_tube: Using mock tips data");
    return new Promise(resolve => {
      setTimeout(() => resolve(mockTipsData.tips), 400);
    });
  }

  try {
    const response = await fetch(`${baseUrl}/users/tips`);
    const text = await response.text();
    console.log(":rocket: RAW API response:", text);
    const data = JSON.parse(text);
    console.log(":white_check_mark: Parsed JSON:", data);


    return data.tips ?? data.products ?? [];
  } catch (error) {
    console.error(":x: Fel vid hämtning av tips:", error.message);
    throw error;
  }
};