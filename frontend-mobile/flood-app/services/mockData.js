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


// Jag har nu följande komponent - som man kommer till om man valt en plats. :) 

// Denna hämtar ju just nu ingenting men tanken är att man här ska kunna påbörja arbete på plats. 

// Statusen kommer här att vara Ej påbörjad - detta är i samband med att typ de som ska styra upp eventuella problem med vatten mm ska kunna ta sig till platsen typ. (Resväg). När de kommer till platsen ska de kunna trycka på "kortet" för att markera att man är på plats.