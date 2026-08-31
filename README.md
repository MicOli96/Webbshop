 Webbshop med React & Typescript

## Starta Projektet

Skapa en `web` mapp i erat repo och skapa en boilerplate med Vite där i, välj React+Typescript. Lägg sedan till React Router i det projektet för att definiera er klient side routing. All data ska hämtas och sparas till ett API så lägg nu till en ny mapp `api` och sätt där upp antingen en C# backend eller en TS backend, ni väljer själva.

Vi kommer i veckan att gå igenom hur vi sätter upp och kommunicerar med en egenskrivet API i TS för att få kommunikationen fullt typad hela vägen till databasen. Vi kommer även gå igenom hur vi lanserar vårt projekt på en egen server men en TS backend.

## Rättning

Uppgiften är obligatorisk och samtliga krav skall göras av alla i gruppen. I slutet av inlämningen så examineras ni individuellt med en tentamen.

## Beskrivning

**Läs noga igenom hela uppgiftsbeskrivningen innan ni börjar.**

I den här laborationen ska ni i grupp om tre skapa en webbshop med hjälp av React, Typescript och ett designsystem som, Shadcn, MUI, ChakraUI eller Mantine. Det ni ska skapa är fyra huvudsakliga sidor: en startsida, en produktsida, en kassasida och en bekräftelsesida.

- /
- /product/1234
- /checkout
- /confirmation/1234

### Startsidan & Produktsidan

Er sida ska presentera ett antal olika produkter på startsidan. Vilka typer av produkter som säljs är valfritt men det ska vara seriöst och välgjort. Det ska vara möjligt att klicka på en produkt för gå till produktsidan där användaren kan läsa mer om den valda produkten. Från både startsidan och produktsidan ska det vara möjligt att lägga till produkter i en kundvagn och det ska tydlig framgå för användaren när produkten läggs till i kundvagnen.

### Kassasidan

#### Kundvagn

Ska lista tillagda produkter (bild & titel) dess antal, pris och kundvagnens totalpris. Det ska vara möjligt att uppdatera kundvagnen - dvs ändra antalet av en produkt eller ta bort en produkt helt från kundvagnen. Totalpriset ska alltid uppdateras och vara korrekt.

#### Leveransuppgifter

Ska vara ett formulär där användaren fyller i namn, mail, telefonnummer och adress. Fälten i formuläret ska gå att automatisk fyllas i. Samtliga fält ska valideras så att endast rätt information kan matas in.

#### Bekräftelsesidan

När alla delar har fyllts i på kassasidan så ska användaren kunna slutföra köpet och då få en bekräftelse på köpet tillsammans med ett unikt ordernummer.

Tänk på att det inte ska gå att placera ordern två gånger, även om man navigerar tillbaka på sidan! All orderinformation som användaren har matat in skall skickas till API'et och sparas i databasen.

### Adminsidan

Designen på denna sida är valfri men skall utgå ifrån designsystemet ni använder er av. Det skall finnas en knapp på startsidan som tar användaren till adminsidan. På adminsidan skall ni lista alla produkter samt ge användaren möjlighet att ta bort, lägga till eller ändra samtliga produkter (CRUD). Om ni väljer att ha en separat sida, modal eller accordion för ändring/tilläggning av en produkt är valfritt men flödet ska vara routat. Samtliga produkter skall vara sparade i en databas och laddas in därifrån när sidor besöks.

## Inlämning

För att bli godkänd på den här uppgiften MÅSTE ni använda GIT och GitHub. Inlämningen sker som vanligt på läroplattformen där ni ska zippa ihop projektmappen (kom ihåg att ta bort node_modules). I projektmappen ska det finnas (utöver all kod) en README.md fil. Den ska innehålla en titel, beskrivning av projektet, info om hur projektet byggs och körs samt länk till dokumentationen för designsystemet som används, mm. Samt en checklista på alla genomförda krav.

## Krav för Godkänt

- [ ] Git & GitHub har använts
- [ ] Projektmappen innehåller en README.md fil - (läs ovan för mer info)
- [ ] Uppgiften lämnas in i tid!
- [ ] Ett designsystem/komponentbibliotek används nästintill helt uteslutande för att bygga sidan (ex: MUI, ChakraUI, Mantine, etc).

**Home**

- [ ] Ska ha en övergripande layout med header, main & footer.
- [ ] Startsidan ska lista samtliga produkter.
- [ ] Det ska gå att lägga till produkter i kundvagnen (header + toast + ls).
- [ ] Det ska gå att klicka på en produkt och komma till en detaljsida.
- [ ] Sidan ska vara responsiv och gå att använda på mobil, tablet & desktop.

**Produkt**

- [ ] Ska ha en övergripande layout med header, main & footer.
- [ ] Detaljsidan ska visa all info om en produkt.
- [ ] Det ska gå att lägga till produkten i kundvagnen (header + toast + ls).
- [ ] Sidan ska vara responsiv och gå att använda på mobil, tablet & desktop.

**Kundvagn & Checkout**

- [ ] Ska ha en övergripande layout med header, main & footer.
- [ ] Det ska gå att gå till checkoutsidan och se innehållet i kundvagnen (knapp & url).
- [ ] Det ska gå att se det totala priset i kundvagnen.
- [ ] Det ska gå att ändra produkterna i kundvagnen (header + vyn + pris + ls).
- [ ] Det ska gå att ange leveransuppgifter i ett formulär.
- [ ] Samtliga fält för checkoutsidans formulär ska ha valideringsregler.
- [ ] Formulären vid utcheckningen ska gå att automatiskt fyllas i.
- [ ] Bekräftelsesidan ska visa orderdetaljer och leveransuppgifter

**Admin**

- [ ] Det finns en admin-sida för produkthantering
- [ ] Det ska gå att se alla produkter på admin sidan
- [ ] Det går att lägga till produkter via admin sidan
- [ ] Det går att ta bort produkter via admin sidan
- [ ] Det går att redigera produkter via admin sidan
- [ ] Samtliga fält för adminsidans formulär ska ha valideringsregler