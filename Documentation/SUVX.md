2025.03.31   
Vi har börjat med vår SRS och försökt komma fram mer konkret till vad vi vill att produkten ska kunna utföra och göra.  
  
2025.04.07   
Vi har fortsatt med SRSen och planering. Vi har också insett att vi behöver fokusera mer på sensorerna i ett första skede och på energiförsörjningen i ett senare skede. Det viktigaste är att vi får fram sensorer som kan samla in data och skicka till databasen. Vi har också fått titta på hårdvaran igen, eftersom vi missbedömt en sensor för vattentrycksmätning. Nu har vi uppdaterat inköpslistan så vi har relevanta grejer som fungerar till det vi tänkt.  
  
2025.04.14  
Vi har jobbat vidare med research på våra olika komponenter. Vissa av oss har också börjat skriva kod för sina komponenter och område. Vi har också insett att det kommer bli svårt att hitta ett simuleringsverktyg som kommer täcka alla sensorer och mikrokontrollerna vi vill använda. Vi har börjat titta på fritzing som verktyg. Vi väntar på vår hårdvara och hoppas verkligen att den kommer snart så vi kan få lägga händerna på den i verkligheten.   
  
2025.04.28  
Vi har börjat skriva kod för våra individuella sensorer och fått igång några av dem så att de läser av värden korrekt. Vi har också delat ut den hårdvara vi har fått, samt pratat ihop oss i gruppen om projektets riktning för att säkerställa att alla är på samma sida. Det har uppstått problem med Heltec-biblioteket, men det löstes genom att degradera biblioteket. Vi har även börjat fundera på om vi ska använda RTOS och olika tasks för sensorerna, samt om det är värt att implementera strömsparfunktioner som deep sleep.  
  
2025.05.05  
Vi har fått LoRa att fungera och lyckats skicka data mellan två enheter med ett ping-pong-exempel. Jordfuktighetssensorn fungerar nu både elektriskt och mjukvarumässigt och är kalibrerad med korrekta mätvärden. En komponent till sensorn fungerade inte som tänkt, men löstes genom en alternativ koppling utan modul. Arbetet med LoRa ser ut att bli mer omfattande än vi trott, men vi följer vår plan.  
  
2025.05.12  
Vi har fått vattentryckssensorn att fungera korrekt efter att ha justerat en felberäkning gällande strömförsörjningen. Sensorn testades utomhus och kunde mäta djup på ett tillfredsställande sätt. Arbetet med att skapa en enkel struktur för överföring av JSON-data för mock-data är påbörjat och vi har också testat att skicka data via WiFi, vilket fungerar preliminärt. Vi har producerat en första version av koden för ultraljudssensorn. Vi märker att hårdvaran ofta kräver mer arbete än väntat.   
  
2025.05.19  
Vi har nu kopplat ihop flera av sensorerna till en och samma LoRa-enhet och lyckats läsa av värden från alla. Det är ett viktigt steg i att börja samla in all data till en och samma MCU. Vi har också påbörjat sammanslagningen av kod för de tre sensorer som ska samverka på en av MCUerna samt börjat dokumentera koden. Temperatursensorn har vi korrigerat koden lite för då den visade 2 grader för varmt jämfört med verkligheten. Vi ser fram emot nästa steg där all hårdvara ska samverka fullt ut. Några mindre justeringar av sensorkod behövs fortfarande, bland annat för ultraljudssensorn så vi får ut en baseline och sedan en avvikelse ifrån den.  
  
2025.05.26  
Vi har nu kopplat ihop samtliga sensorer och testat kommunikationen, vilket till största delen fungerade som planerat. Arbetet med pitchen har påbörjats med bild- och videomaterial, samt inspelning av ljud. Vi kan nu skicka sensorvärden till backend, vilket är ett stort steg framåt. Den enda komponent som fortfarande strular är vattentryckssensorn, som vi förmodligen inte hinner få igång innan imorgon. Vi har även förenklat vår kodbas och hur vi bygger för olika enheter. Felsökning har tagit en hel del tid, särskilt eftersom felet visade sig ligga i hårdvaran och inte i koden.   
  
2025.06.02  
Den här veckan har vi lyckats lösa problemen med vattentryckssensorn – den fungerar nu som den ska och skickar avvikelsevärden utifrån en korrekt baseline. Det krävdes en del felsökning med print-debugging och vi hittade orsaken i datatyper (overflow från uint i stället för int) samt i hur vi skickade data via LoRa (bitvisa operationer). Vi har även färdigställt användarmanualen för hårdvaran och jobbat på ett kopplingsschema. Utöver detta har vi förbättrat hur man konfigurerar pinnar och tröskelvärden i koden och dokumenterat hur det görs. Sensordata kan nu skickas in till backend med autentisering via token. Det märks att vi närmar oss slutspurten – stressen påverkar förmågan att felsöka strukturerat.  
  
2025.06.09  
Den här veckan har fokus legat på att färdigställa dokumentationen och se över vad som återstår. Vi lyckades få hårdvaran att skicka data korrekt till backend innan finaldagen den 4 juni och hade en produkt som fungerade att visa upp! Hårdvaran fungerar som den ska – även om någon sensor är lite glapp. Det har varit lite stressigt att få allt klart i tid, särskilt dokumentationen, då vi inte varit så noga med att underhålla den löpande. Love tog på sig att läsa in sig på hur man skriver bra arkitekturdokumentation, vilket blev ett viktigt bidrag. Vi hade behövt vara mer konsekventa med dokumentationen under projektets gång – det hade besparat oss en hel del arbete i slutet. Kvar att göra är ett retrospectiv med hela gruppen samt fixa färdigt accessability dokumentet, vilket vi tänker att frontend har mest kunskap om så vi ska diskutera detta med dem.   