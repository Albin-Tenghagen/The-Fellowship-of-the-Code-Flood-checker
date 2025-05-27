import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import { db, auth } from "./firebaseConfig";
import { mockLocations, mockMonitoringEntries, mockInfrastructureIssues, mockUserTips } from "./mockData";


// Funktion för att ladda upp mockdata
// Lägg till data i mockData.js för att kunna skicka till databas (firebase)
// Knapp finns i SettingsScreen
export const uploadMockLocations = async (teamId = "teamFlood") => {
  const user = auth.currentUser;
  if (!user) {
    console.warn("Du måste vara inloggad för att skicka data.");
    return;
  }

  const collectionRef = collection(db, "projects", teamId, "locations");

  for (const location of mockLocations) {
    try {
      await addDoc(collectionRef, {
        ...location,
        uploadedBy: user.uid,
        timestamp: new Date().toISOString(),
      });
      console.log("Lagt till:", location.location);
    } catch (error) {
      console.error("Kunde inte lägga till:", location.location, error);
    }
  }
};

// Hämtar alla locations och tilldelar slumpad vattennivå
// Används i FlatListLocation 
export const getLocationsWithWaterLevel = async (teamId = "teamFlood") => {
  const snapshot = await getDocs(collection(db, "projects", teamId, "locations"));
  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    waterlevel: Math.floor(Math.random() * 11)
  }));
  return data.sort((a, b) => b.waterlevel - a.waterlevel);
};


// Funktion för att ladda upp mockdata
// Lägg till data i mockData.js för att kunna skicka till databas (firebase)
// Knapp finns i SettingsScreen
export const uploadMockMonitoringEntries = async (teamId = "teamFlood") => {
  const user = auth.currentUser;
  if (!user) {
    console.warn("Du måste vara inloggad för att skicka data.");
    return;
  }

  console.log("teamId är:", teamId);
  console.log("db är:", db);

  const collectionRef = collection(db, "projects", teamId, "monitoring");

  for (const entry of mockMonitoringEntries) {
    try {
      await addDoc(collectionRef, {
        ...entry,
        uploadedBy: user.uid,
        timestamp: new Date().toISOString()
      });
      console.log("Monitoringdata tillagd:", entry);
    } catch (error) {
      console.error("Fel vid uppladdning:", error);
    }
  }
};

export const getMonitoringEntries = async (teamId = "teamFlood") => {
  const collectionRef = collection(db, "projects", teamId, "monitoring");
  const snapshot = await getDocs(collectionRef);

  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return data;
};


export const uploadMockInfrastructure = async (teamId = "teamFlood") => {
  const user = auth.currentUser;
  if (!user) {
    console.warn("Du måste vara inloggad för att skicka data.");
    return;
  }

  const collectionRef = collection(db, "projects", teamId, "infrastructure");

  for (const issue of mockInfrastructureIssues) {
    try {
      await addDoc(collectionRef, {
        ...issue,
        uploadedBy: user.uid,
        timestamp: new Date().toISOString(),
      });
      console.log("Infrastrukturproblem tillagt:", issue.problem);
    } catch (error) {
      console.error("Fel vid uppladdning:", error);
    }
  }
};

export const getInfrastructureIssues = async (teamId = "teamFlood") => {
  try {
    const snapshot = await getDocs(collection(db, "projects", teamId, "infrastructure"));
    const issues = snapshot.docs.map(doc => doc.data());
    console.log("Infrastrukturproblem:", issues);
    return issues;
  } catch (error) {
    console.error("Fel vid hämtning av infrastrukturproblem:", error);
    return [];
  }
};


export const uploadMockUserTips = async (teamId = "teamFlood") => {
  const user = auth.currentUser;
  if (!user) {
    console.warn("Du måste vara inloggad för att skicka data.");
    return;
  }

  const collectionRef = collection(db, "projects", teamId, "tips");

  for (const tip of mockUserTips) {
    try {
      await addDoc(collectionRef, {
        ...tip,
        uploadedBy: user.uid,
        timestamp: new Date().toISOString()
      });
      console.log("Tips tillagd:", tip.description);
    } catch (error) {
      console.error("Kunde inte lägga till tips:", tip.description, error);
    }
  }
};

export const getUserTips = async (teamId = "teamFlood") => {
  try {
    const snapshot = await getDocs(collection(db, "projects", teamId, "tips"));
    const tips = snapshot.docs.map(doc => doc.data());
    console.log("Tips hämtade:", tips);
    return tips;
  } catch (error) {
    console.error("Fel vid hämtning av tips:", error);
    return [];
  }
};

