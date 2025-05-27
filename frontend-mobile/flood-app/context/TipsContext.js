import { createContext, useState, useContext } from 'react';

const TipsContext = createContext();

export const TipsProvider = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const triggerRefresh = () => setRefreshTrigger(prev => !prev);

  return (
    <TipsContext.Provider value={{ refreshTrigger, triggerRefresh }}>
      {children}
    </TipsContext.Provider>
  );
};

export const useTips = () => useContext(TipsContext);
