import baseUrl from "./urlConfig";

export const fetchSafety = async () => {
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
  try {
    const response = await fetch(`${baseUrl}/admins/authenticated/monitoring/historicalMonitoring`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    console.log(":rocket: RAW monitoring response:", text);
    
    const data = JSON.parse(text);
    console.log(":white_check_mark: Parsed monitoring JSON:", data);

    return data.monitoredData || [];
  } catch (error) {
    console.error(":x: Error fetching monitoring data:", error.message);
    throw error;
  }
};

export const fetchInfrastructureIssues = async () => {
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
  try {
    const response = await fetch(`${baseUrl}/users/tips`);
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