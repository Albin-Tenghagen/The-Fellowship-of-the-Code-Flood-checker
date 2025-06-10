Retrospective HydroGuard av
The Fellowship of the Code
Teammedlemmar: Love Lindeborg, Marco Lind, Anna Schwartz, Victor Silkisberg, Evie Kroon, Albin Tenghagen, Sami Al-halabi, Zana Palani, Sandra Hellvard och Federica Misirocchi

Närvarande på retrospect: Love Lindeborg, Marco Lind, Anna Schwartz, Victor Silkisberg, Evie Kroon, Albin Tenghagen och Sami Al-halabi
1. Inledning & projektbeskrivning
Beskriv syftet med projektet och vad målet var.
Syftet med uppgiften var att vi som studenter skulle få erfarenhet av att jobba med större projekt, där vi samarbetar med andra klasser som läser andra linjer än oss. För att främja vår samarbetsförmåga och kommunikationsförmåga för att tillsammans nå ett gemensamt mål. Man ska kunna jobba med olika människor och kunna kommunicera med folk om programmering, fastän man inte har samma tekniska expertis. Är lika viktigt i arbetslivet som att kunna programmera.

Målet var att kunna samarbeta som ett större team och träna på våra samarbetsförmågor och kommunikationsförmågor och få fram en färdig produkt som vi kunde presentera för juryn i slutändan. 
Vad skulle levereras?
Det som skulle levereras inom chas challenge var en produkt eller tjänst med temat B2B. Vilket betyder Business to Business.

Vi valde att skapa ett system för vattennivåbevakning med hjälp av sensorer som samlar in data, databas för lagring samt ett användargränssnitt för att presentera informationen för användaren. 

Vilka metoder användes (t.ex. Scrum, Kanban, vattenfall)?
Vi började med att använda oss av en kanban- och scrumblandning. Vi övergav dock detta eftersom vi kände att det var överflödigt och vi kunde göra ett minst lika bra arbete utan en kanbanbräda. Vi dokumenterade vad som skulle göras och vad de alla grupperna jobbade med och kunde därav arbeta med en agil arbetsmetodik med goda resultat.
2. Vad gick bra?
Titta på projektet i sin helhet. Fundera på:
Tekniska framgångar
Driftsättning av både databas och API-server på Railway var en framgång som inte alla i Chas-Challenge nådde. 

Vi lyckades bra med sensorintegrationen, vi lyckades få alla våra tänkta sensorer att samla in korrekt data och sedan överföra den via LoRa och Wifi in till databasen. 
Samarbete och kommunikation
Vi tycker att vi blev bättre och bättre på att kommunicera, framförallt efter att vi haft en del motgångar i samarbetet och kommunikationen. Initialt upplevde vi att kommunikationen fungerade bra, men efter en konflikt förstod vi att det fanns problem, men efter det så förbättrades kommunikationen avsevärt.
Leverans, planering och måluppfyllelse
Vi skrev en bra och tydlig SRS/kravspecifikation samt User stories från början för att minimera missförstånd samt veta tydligt vad vi skulle leverera och hur.
Under arbetets gång jobbade vi agilt vilket gjorde att vi kunde anpassa vårt arbete efter varandra utan större förhinder i projektet som helhet. Vilket ledde till en förbättrad arbetseffektivitet för projektet men också teamens “individuella” arbete.

Vi upprättade även tidigt en kodstandard, vilket gjorde vår kodbas mer läsbar och homogen.
Verktyg och arbetssätt som fungerade
Våra tisdagsmöten fungerade bra, det gav oss en tydlig bild av vad som gjorts av de mindre teamen sen sist samt vad som behövde göras och om det fanns några frågetecken mellan teamen och hur dessa skulle lösas. 
Scrum tankesättet som vi fått lära oss om under skolan fick vi en verklig känsla om hur stora fördelar det kan innebära. Med hjälp av metoder som sprints, stand ups etc. Så har vi fått en praktisk upplevelse om hur de agila arbetsmetoderna underlättar och smidig gör ett samarbete och också fått insikt till varför det är så omtalat inom tech-branschen. 

Vi har använt PlatformIO för programmeringen av hårdvaran och det har fungerat bra att använda när det varit flera programmerare inblandade. Fritzing har vi använt för att rita upp bra kopplingsscheman för hårdvaran. Vi har använt ett strukturerat sätt för att felsöka hårdvaran på rent elektrisk nivå, genom att koppla, mäta med multimeter och systematiskt komma fram till vart den felande länken är.
3.  Vad kunde ha varit bättre?
Reflektera över utmaningar:

Tekniska problem
Docker fungerade inte alls för en del teammedlemmar, Docker är något som vi inte har fått undervisning vilket ledde till förvirringar kring dess implementering . Dessutom fanns bristande eller obefintlig dokumentation för delar av hårdvaran vilket ställde till det. 
Kommunikationsbrister
Vi hade ett större missförstånd i kommunikationen som ledde till en konflikt. Efter konflikten blev kommunikationen bättre, men efter ett tag upplevdes det som att vissa i teamet inte orkade engagera sig i att upprätthålla den bättre kommunikationen vi fick till efter konflikten. 
Så medan kommunikation som helhet har varit rätt bra. Så har det stundvis varit mindre bra, då avsaknaden av engagemang hos vissa har försvårat samarbetet, speciellt mot slutet av projektet. Då allting skulle sammanfogas, där det också kan vara som viktigast att ha en bra kommunikation.
Tidsförluster
En stor tidsförlust under projektet. Var skolans oförmåga att förse oss med de resurser som krävdes för att vi skulle kunna arbeta med projektet. Inte förrän ungefär 4 veckor in i projektet kunde systemutvecklarna börja arbeta ordentligt för att vi inte fick hårdvaran förrän då. Vilket vi upplevde var ett väldigt stort hinder men också ett irritationsmoment. Eftersom en del av gruppen blev väsentligt "tvingade" till att rulla tummarna under en längre period.

Eftersom projektet endast var 10 veckor långt, och hårdvaran kom 4 veckor efter dess start, tycker vi att det är oacceptabelt slarvigt av skolan att inte förse studenterna med resurser som inte projektet hade klarat sig utan.   

Missade eller otydliga krav
Förslag: Kraven på dokumentation under projektet var lite otydliga, det har varit svårt att tyda vad som ska dokumenteras vart.
Det skapade en del stressmoment, då det var svårt att veta vad som förväntades av oss som individer men också som helhet(?)
4.  Vad lärde vi oss?
Här kan du ta ett steg tillbaka och se:

Nya tekniker/ramverk ni lärt er
Radiolib, HTTP/HTTPS REST förfrågningar

Docker, railway, postman, Databashantering med postgres. Rest-designade API:er med Express. 

Vad du/ni skulle göra annorlunda i ett liknande framtida projekt
Kontrollera redan från början om vi behövde ha dubbla uppsättningar hårdvara, i.e. speca beställningar bättre. Vi kunde även ha dokumenterat mera löpande, och inte mestadels i slutet.

I ett framtida projekt tror jag att en gemensam lättanvändlig kanbanbräda hade kunnat underlätta för dokumenteringen. Som till exempel Trello.
Insikter om projektarbete, samarbete eller kommunikation
Vad som är lätt i teorin är alltid svårare i praktiken när det gäller hårdvara. Det är svårt att hitta tillbaka från när man arbetar så “sporadiskt” eller utspritt. Det är svårt att hitta rytmen igen när man sitter två dagar i veckan med projektarbete, sen resten av veckan med annat. Det blir ett mentalt “hopp”. Det hade varit lättare att arbeta “i ett kör” med bara projektet och inget annat under en kortare tid istället.

5.  Förslag till förbättring (framtiden)
Vi kan ha dokumenterat mer under tidigare skeden så inte så mycket dokumentation behövs på slutet av projektet.

Vi kunde ha planerat mer och använt ett mer traditionellt agilt arbetssätt. 
Annorlunda struktur eller teknikval?
Vi kunde ha valt att använda oss av mer dokumenterad hårdvara, detta hade underlättat utvecklingsprocessen. Vi kunde även ha börjat med en snävare bild av den färdiga produkten och sedan bygga ut med fler funktioner. 

Tydligare rollfördelning?
Vi upplever att rollfördelningen fungerat bra. Vi röstade fram ledare, men vi har arbetat väldigt platt och upplever att det fungerat bra.
