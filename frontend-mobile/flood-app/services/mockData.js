export const mockLocations = [
    {
        location: "Sofielund / Seved (Malmö)",
        description: "Skyfall - vatten har svårt att rinna undan",
        proactiveActions: {
            basementProtection: "Lägg sandsäckar vid dörrar.",
            trenchDigging: "Ej nödvändigt",
            electricHazards: "Flytta upp elektronik i hemmet"
        },
        waterlevel: 8
    },
    {
        location: "Bullerbyn / Norra Fäladen (Lund)",
        description: "Dräneringssystemet överbelastat pga av kraftigt regn",
        proactiveActions: {
            basementProtection: "Kontrollera dränering",
            trenchDigging: "Gräv skyddsdike om möjligt",
            electricHazards: "Undvik kontakt med vattennära uttag"
        },
        waterlevel: 6
    },
    {
        location: "Pildammsparken / Stadionområdet (Malmö)",
        description: "Risk för att vatten stiger upp på gångvägar och närliggande gator pga av intensiv nederbörd",
        proactiveActions: {
            basementProtection: "Kontrollera dränering",
            trenchDigging: "Gräv skyddsdike om möjligt",
            electricHazards: "Undvik kontakt med vattennära uttag"
        },
        waterlevel: 4
    },
    {
        location: "Kobjer (Lund)",
        description: "Höje å har svämmat över - risk för vatten i park och på gångväg",
        proactiveActions: {
            basementProtection: "Kontrollera dränering",
            trenchDigging: "Gräv skyddsdike om möjligt",
            electricHazards: "Undvik kontakt med vattennära uttag"
        },
        waterlevel: 4
    },
    {
        location: "Limhamn – Sibbarp (Malmö)",
        description: "Högt vattenflöde pga av regn och pålandsvind",
        proactiveActions: {
            basementProtection: "Kontrollera dränering",
            trenchDigging: "Gräv skyddsdike om möjligt",
            electricHazards: "Undvik kontakt med vattennära uttag"
        },
        waterlevel: 10
    },
];

export const mockMonitoringEntries = [
  {
    airPressure: 1012,
    soilMoisture: 45,
    temperature: 16,
    humidity: 78,
    pressureLevel: 30,
    ultraSoundLevel: 5
  },
  {
    airPressure: 1008,
    soilMoisture: 52,
    temperature: 18,
    humidity: 70,
    pressureLevel: 29,
    ultraSoundLevel: 6
  },
  {
    airPressure: 1010,
    soilMoisture: 50,
    temperature: 15,
    humidity: 80,
    pressureLevel: 31,
    ultraSoundLevel: 4
  },
  {
    airPressure: 1005,
    soilMoisture: 60,
    temperature: 13,
    humidity: 85,
    pressureLevel: 33,
    ultraSoundLevel: 7
  },
  {
    airPressure: 1015,
    soilMoisture: 42,
    temperature: 19,
    humidity: 65,
    pressureLevel: 28,
    ultraSoundLevel: 3
  },
  {
    airPressure: 1003,
    soilMoisture: 55,
    temperature: 14,
    humidity: 90,
    pressureLevel: 34,
    ultraSoundLevel: 6
  },
  {
    airPressure: 1007,
    soilMoisture: 48,
    temperature: 17,
    humidity: 72,
    pressureLevel: 30,
    ultraSoundLevel: 5
  },
  {
    airPressure: 1011,
    soilMoisture: 47,
    temperature: 20,
    humidity: 68,
    pressureLevel: 27,
    ultraSoundLevel: 2
  },
  {
    airPressure: 1006,
    soilMoisture: 53,
    temperature: 12,
    humidity: 87,
    pressureLevel: 35,
    ultraSoundLevel: 8
  },
  {
    airPressure: 1013,
    soilMoisture: 49,
    temperature: 15,
    humidity: 76,
    pressureLevel: 32,
    ultraSoundLevel: 5
  }
];

export const mockInfrastructureIssues = [
  { problem: "Översvämmad väg vid Dalbyvägen (Lund)" },
  { problem: "Vattenläcka på Amiralsgatan (Malmö)" },
  { problem: "Avlopp överbelastat vid Södertull (Lund)" },
  { problem: "Underjordisk gång stängd pga översvämning (Malmö C)" },
  { problem: "Gatubrunnar blockerade av löv i Limhamn" },
  { problem: "Parkering dränkt vid Pildammsvägen" },
  { problem: "Gångväg otillgänglig vid Östra Torn pga vatten" },
  { problem: "Stora vattensamlingar vid Nobeltorget" },
  { problem: "Busshållplats översvämmad vid Centralstationen" },
  { problem: "Trafikljus ur funktion pga fukt i teknikskåp" },
];

export const mockUserTips = [
  {
    location: "Sofielund / Seved (Malmö)",
    description: "Översvämning nära förskolan – vatten täcker gångbanan",
    user: "Lisa"
  },
  {
    location: "Bullerbyn / Norra Fäladen (Lund)",
    description: "Vatten tränger in i källaringång – grannar bör kolla upp",
    user: "Erik"
  },
  {
    location: "Limhamn – Sibbarp (Malmö)",
    description: "Regnvatten rinner inte undan vid parkeringen",
    user: "Fatima"
  },
  {
    location: "Kobjer (Lund)",
    description: "Stora pölar på cykelbanan – risk för halka",
    user: "Oskar"
  },
  {
    location: "Pildammsparken / Stadionområdet (Malmö)",
    description: "Vattennivån i dammen är ovanligt hög",
    user: "Anna"
  },
  {
    location: "Möllevången (Malmö)",
    description: "Avlopp bubblar upp i källaren",
    user: "Johan"
  },
  {
    location: "Klostergården (Lund)",
    description: "Regnvatten står kvar på innergården",
    user: "Sandra"
  },
  {
    location: "Västra hamnen (Malmö)",
    description: "Vatten slickar trottoarkanten – pågående skyfall",
    user: "Nils"
  },
  {
    location: "Linneplatsen (Lund)",
    description: "Trädgårdar börjar fyllas med vatten",
    user: "Elin"
  },
  {
    location: "Rosengård (Malmö)",
    description: "Översvämmat soprum – lukt och hygienrisk",
    user: "Ali"
  }
];



