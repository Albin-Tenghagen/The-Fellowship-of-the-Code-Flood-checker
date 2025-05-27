import React, { createContext, useContext, useState, useEffect } from "react";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userNotificationsData, setUserNotifications] = useState([]);
  const [userRisksData, setUserRisks] = useState([]);
  const [userSafetyData, setUserSafety] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [notiRes, risksRes, safetyRes] = await Promise.all([
          fetch("http://localhost:5000/api/userNotifications"),
          fetch("http://localhost:5000/api/userRisks"),
          fetch("http://localhost:5000/api/userSafety"),
        ]);

        if (!notiRes.ok || !risksRes.ok || !safetyRes.ok) {
          throw new Error("One or more data sources failed to load.");
        }

        const [notiData, risksData, safetyData] = await Promise.all([
          notiRes.json(),
          risksRes.json(),
          safetyRes.json(),
        ]);

        setUserNotifications(notiData);
        setUserRisks(risksData);
        setUserSafety(safetyData);
      } catch (err) {
        setError(err.message || "Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <UserDataContext.Provider
      value={{
        userNotificationsData,
        userRisksData,
        userSafetyData,
        loading,
        error,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider.");
  }
  return context;
};
