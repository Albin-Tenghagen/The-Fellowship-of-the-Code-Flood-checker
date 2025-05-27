# PROJEKTPLAN: ÖversvämningsKollen

## Introduktion och Bakgrund

- **Projektets syfte och mål med en vision över den allmäna strukturen:**
  Utveckla ett system för att övervaka och hantera
  översvämningsrisker i en kommun genom användning av IoT-sensorer och en
  digital plattform. Systemet ska ge realtidsinformation om vattennivåer,
  optimera resursallokering och möjliggöra snabb respons. Projektet kommer använda sig
  av en trycksensor i vatten/sjö för att mäta trycket och därigenom räkna fram djupet/nivån.
  Vi kommer även ha en sensor som mäter höjden på vattnet med hjälp av ultraljud för att ha
  nån form av backup om den ena sensorn skulle gå sönder. Vi tänkte även mäta temperatur
  och jordfuktighet för att man lättare ska kunna räkna ut om risken för översvämming är stor.
  Vi vill sedan skicka den insamlade datan till en databas.

  Datan som samlas in via sensorerna kommer samlas i en PostgreSQL databas där det kommer sedan föras vidare till olika jämförelseoperatorer i backend. Express kommer användas mellan databasen till backend och frontend applikationen. Där det kan hämtas uppdateringar genom express.js Som sedan kan ge fullskaliga rapporter som speglas i applikationen och kunna uppdatera användaren, antingen i realtid eller med ett visst antal "rapporter" under ett visst tidsspan

- **Problem som lösningen ska adressera:**
  - Brist på realtidsinformation om vattenflöden.
  - Ineffektiv resursallokering vid översvämningar.
  - Bristande medborgarinvolvering och kommunikation.
  - Svårigheter att analysera historiska data för prediktion.
- **Intressenter och målgrupp:**
  - Kommuner och lokala räddningstjänster.
  - Medborgare och lokala frivilligorganisationer.
  - SMHI och andra relevanta myndigheter.
  - Infrastrukturförvaltare.

## Val av Teknologi och Arkitektur

- **Frontend:** React (webbapplikation), React Native (mobilapp)
- **Backend:** Node.js med Express.js PostgreSQL
- **IoT:** LoRa kompatibla utvecklingskort som använder sensorer för vattennivåmätning,
  jordfuktighetsmätning och temperatur. -MQTT för dataöverföring
- **Systemarkitektur:**

  ```
  [IoT Sensors] --(LoRa/MQTT)--> [Backend API (Node.js/Express.js)]
      |                                   ^
      v                                   |
  [Database (PostgreSQL)] <-------------> [Frontend (React/React Native)]
  ```

```
 [Frontend]
     ˄
     |
     ˅
 [Backend]
     ˄
     |
     ˅
 [Databas]
     ˄
     |
 [Sensorer]
```

- **Databas:** PostgreSQL (Relationsdatabas för dataintegritet och komplexa frågor)

- **Backend Framework:** Express.js (Node.js ramverk för att skapa RESTful API:er)

- **API-struktur:** RESTful API med JSON-format för kommunikation mellan frontend,
  backend och IoT-enheter. Standardiserade endpoints för sensordata, incidentrapportering,
  användarhantering och notifikationer.

## Teamstruktur och Ansvarsområden

- **Teamindelning:**

  - Frontend Team: Frontendutvecklare - Federica, Sandra

  - Backend Team: Fullstackutvecklare - Albin, Sami, Zana

  - IoT Team: Systemutvecklare - Anna, Marco, Victor, Love, Evie

- **Ansvarsområden:**

  - Frontend Team: Utvecklar webbapplikation för insatsledning och mobilapp för
    medborgare.

  - Backend Team: Utvecklar API:er (med Express.js), databasstruktur, autentisering
    och notifikationstjänster (med Node.js).

  - IoT Team: Implementerar och konfigurerar IoT-sensorer, säkerställer
    dataöverföring och utvecklar algoritmer för riskanalys.

- **Samarbete och kunskapsöverföring:**

  - Regelbundna möten mellan teamen för att synkronisera arbetet.

  - Gemensam dokumentation och code reviews för kunskapsdelning.

  - Använda en gemensam plattform för kommunikation och uppgiftshantering.

## Arbetsmetodik och Verktyg

- **Agil metodik:** Scrum och Kanban
- **Verktyg:**

  - Kodhantering: Git, GitHub

  - Design: Figma &/ Figjam

  - Kommunikation: Discord

  - Sprintplanering och uppgiftshantering: Githubs Projekt brädor

- **Scrum-process:**

  - Standups:

  Varje Tisdag kommer vi ha en standup tillsammans med hela gruppen kl 9:15

  Teamen är uppdelade efter våra olika linjer så varje vecka kommer det bli en standup för varje team på deras Boiler room

  Frontendutvecklare - Onsdag

  Fullstackutvecklare - Fredag

  Systemutvecklare - Måndag

  - Sprintplanering: Innan varje sprint planeras vilka uppgifter som ska utföras.

  Vi funderar över om vi ska ha en sprint över 1 eller 2 veckor.

  Beroende på hur mycket vi förväntas att lägga på detta projektet varje vecka så kommer vi justera så antingen det blir

  1 veckos sprintar - om vi förväntas lägga mer tid än den vi har till Boiler Room redan
  2 veckors sprintar - Om vi bara ska lägga Boiler Room tid på detta projekt

  - Retros:
    En retro kommer hållas varje vecka inom dem separata teamen för att identifiera

  1. Vad gick bra
  2. vad gick inte så bra
  3. Saker som behöver ses över innan full deployment?
  4. Saker som är blocked/waiting

  - Demos:

    Varje tisdag när gruppen samlas så kommer vi köra en Demo av vad dem olika teamen har åstakommit.
    På så sätt kommer vi kunna hålla varandra uppdaterade om dem olika delarna av applikationen och då kommer vi kunna i mer detalj planera.

    1. Vad kommer nästa sprint/vecka innebära för gruppen som helhet, men också för teamen i sig

- **Code Reviews:**

  Alla ändringar i koden ska granskas av minst en annan
  teammedlem innan de integreras i huvudgrenen (pull requests).

                Master
                  |
               developgren
                  |

  ***

  | | |
  Systemgren backendgren frontendgren

## Tidsplan och Milstolpar

- **Övergripande tidsplan:**

  - Vecka 10-12: Planering, kravanalys och arkitekturdesign.

  Hur mycket tid varje vecka kommer vi förväntas att lägga på chas challenge framöver?
  Vad ska arkitekturdesignen innehålla exakt?
  Kommer det innebära srs:er?

  - Vecka 13-15: Utveckling av backend-API (Node.js/Express.js) och databas
    (PostgreSQL schema design).
    Utveckling av frontend kommer påbörjas under denna tidsperiod också
    Framtagning av fungerande sensorprototyp

  - Vecka 16-18:
    Finslippning och vidareutveckling av:

  1. databas design och integration av system, backend och frontend
  2. Utveckling av frontend-applikationer.
  3. Vidareutveckla sensorerna, ta fram simuleringsverktyg för att kunna testa att sensorer och system verkligen fungerar.

  - Vecka 19-22: Integration, testning och optimering.

- **Milstolpar:**

  - Vecka 16: Första fungerande prototypen (MVP) med grundläggande
    sensorintegration och API-funktionalitet.

  - Vecka 18: Implementering av kärnfunktioner för både frontend och backend.

  - Vecka 22: Slutgiltig testning, optimering och dokumentation.

  -vecka 23: ProjektAvslut

- **Hantering av tidsförändringar:**
  Om en uppgift tar längre tid än förväntat,
  omfördela resurser eller skala ner på mindre viktiga funktioner för att hålla
  tidsplanen. Prioritera kärnfunktioner.

## Riskanalys och Plan för Problemhantering

| Risk                           | Hanteringsstrategi                                                                             |
| :----------------------------- | :--------------------------------------------------------------------------------------------- |
| Tekniska utmaningar (sensorer) | Noggrann testning, val av beprövad teknik, ha alternativa sensorer klara.                      |
| Brist på kommunikation         | Regelbundna möten, tydliga kommunikationskanaler (discord), dokumentation.                     |
| Tidsbrist                      | Prioritera funktioner, omfördela resurser, realistisk tidsplan.                                |
| Teammedlem underpresterar      | Tidig identifiering, stöd och hjälp, tydliga förväntningar, i värsta fall omfördela uppgifter. |

- **Problemhantering:** Använd Githubs Kanban för att rapportera och spåra problem. Prioritera
  problem baserat på allvarlighetsgrad och påverkan.
- **Hantering av underpresterande teammedlem:** Identifiera problem tidigt, erbjud
  stöd och resurser, sätt upp tydliga mål och förväntningar. Om förbättring inte
  ses, omfördela uppgifter.

## Leveranser och Dokumentation

- **Slutproduktens minimikrav:**

  - Fungerande IoT-sensorer som skickar data till backend.

  - API (utvecklat med Node.js/Express.js) för att hantera sensordata och incidenter.

  - Webbapplikation för insatsledning med realtidsöversikt.

  - Mobilapp för medborgare för rapportering och notifikationer.

- **Teamleveranser:**

  - Frontend: Dashboard, mobilapp, kartfunktioner.

  - Backend: API (Node.js/Express.js), databas (PostgreSQL schema),
    notifikationstjänst, autentisering.

  - IoT: Fungerande sensorer, dataöverföring, riskanalysalgoritmer.

- **Dokumentation:**

  - README-fil med instruktioner för installation och användning.

  - API-dokumentation (Swagger/OpenAPI).

  - Användarmanualer för webb- och mobilapplikationer.

  - Systemdokumentation som beskriver arkitektur och design.

  - Databas schema dokumentation (PostgreSQL).

- **Underhåll av dokumentation:** En person per team ansvarar för att hålla
  dokumentationen uppdaterad. Regelbundna genomgångar för att säkerställa
  korrekthet.

## Slutlig checklista för projektplanen

- [ ] Dokumenterad som PROJEKTPLAN.md i Git-repot.

- [ ] Innehåller alla ovanstående punkter.

- [ ] Projektplanen skickad till utbildare senast den 21/3 klockan 15.00.

- [ ] Godkänd av utbildare innan utvecklingsarbetet startar.

## Vad kommer behöva köpas in?

1. Water level sensor, Price 399kr Link: https://amzn.eu/d/7HDqABt 
2. Transistors, Price 118kr Link: https://amzn.eu/d/8aY95bV
3. Boost converters,  Price 77 kr Link: https://amzn.eu/d/8Bssg6y 
4. Microcontroller 2x, Price 262kr each Link: https://amzn.eu/d/dmU1WWF
5. Breadboards kit 3x (Can choose quantity 3 in store), Price 159 kr Link: https://amzn.eu/d/f1X8pQU 
   Total kostnad: ca 1300kr

- Nuvarande budget lämnar en buffert på 700kr som lämnades avsiktligt för att ha råd för inköp som kan behövas senare. Som tillexempel nånting att hålla komponenterna i, sensorer eller dylikt som saknas för att slutföra projektet.
