import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import { db, auth } from "./firebaseConfig";
import { mockLocations, mockMonitoringEntries } from "./mockData";


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