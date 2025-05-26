import React, { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const selectLocation = (location) => {
    setSelectedLocation(location);
    console.log('Plats vald:', location); 
  };

  const clearSelectedLocation = () => {
    setSelectedLocation(null);
    console.log('Plats rensad'); 
  };

  return (
    <LocationContext.Provider value={{
      selectedLocation,
      selectLocation,
      clearSelectedLocation
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation måste användas inom en LocationProvider');
  }
  return context;
};