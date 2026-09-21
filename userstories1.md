#ChatGPT user stories

## **Teamets User Stories & Acceptanskriterier**
### **User Story 1: Söka efter produkter**
**Som en** kund som letar efter en specifik produkt **vill jag** kunna skriva in ett sökord i sökfältet och se matchande produkter **så att** jag slipper bläddra igenom hela sortimentet manuellt.

**Acceptanskriterier (Given / When / Then):**

  - **Given** att jag befinner mig på produktkatalogen

  - **When** jag söker efter `"jacka"`

  - **Then** uppdateras URL:en till `?search=jacka` och endast produkter som matchar sökningen visas.

  - **And** om inga produkter matchar visas meddelandet: **"Inga produkter matchade din sökning."**

  - **And** sökningen ska finnas kvar om jag laddar om sidan.

### **User Story 2: Filtrera produkter efter kategori**
**Som en** kund som vill hitta en viss typ av produkt **vill jag** kunna filtrera produktkatalogen efter kategori **så att** jag snabbt kan begränsa resultatet till relevanta produkter.

**Acceptanskriterier (Given / When / Then):**

  - **Given** att jag befinner mig på produktkatalogen och det finns flera produktkategorier

  - **When** jag väljer kategorin `"Electronics"`

  - **Then** uppdateras URL:en med `category=Electronics`

  - **And** endast produkter från kategorin `"Electronics"` visas.

  - **And** när sidan laddas om ska det valda kategorifiltret fortfarande vara aktivt.

  - **And** om inga produkter finns i kategorin ska ett tydligt meddelande visas.

### **User Story 3: Visa produktdetaljer**
**Som en** kund som är intresserad av en produkt **vill jag** kunna klicka på en produkt och se detaljerad information **så att** jag kan bedöma produkten innan jag går vidare med ett köp.

**Acceptanskriterier (Given / When / Then):**

  - **Given** att jag befinner mig på produktkatalogen

  - **When** jag klickar på en produkt

  - **Then** navigeras jag till produktens unika URL, exempelvis `/products/42`.

  - **And** sidan visar produktens namn, bild, beskrivning, pris och kategori.

  - **And** sidan visar produktens lagerstatus och en köpknapp när produkten finns i lager.

  - **And** om produkten inte existerar visas en användarvänlig 404-/not-found-sida.

### **User Story 4: Bläddra mellan produktsidor**
**Som en** kund som vill utforska hela sortimentet **vill jag** kunna bläddra mellan flera sidor med produkter **så att** katalogen blir överskådlig även när det finns många produkter.

**Acceptanskriterier (Given / When / Then):**

  - **Given** att produktkatalogen innehåller fler produkter än vad som ryms på en sida

  - **When** jag klickar på nästa sida

  - **Then** uppdateras URL:en med exempelvis `?page=2`

  - **And** produkterna på den valda sidan visas.

  - **And** jag ska kunna navigera tillbaka till föregående sida.

  - **And** mina aktiva sök- och kategorifilter ska behållas när jag byter sida, exempelvis `?search=phone&category=Electronics&page=2`.

### **User Story 5: Visa varukorg och ordersammanställning**
**Som en** kund som har valt produkter **vill jag** kunna se en sammanställning av min varukorg **så att** jag kan kontrollera produkter, antal och totalbelopp innan checkout.

**Acceptanskriterier (Given / When / Then):**

  - **Given** att jag befinner mig på varukorgssidan

  - **When** sidan laddas

  - **Then** visas valda/exempelprodukter med produktnamn, antal och pris.

  - **And** ett totalt ordervärde/subtotal visas tydligt.

  - **And** totalbeloppet ska vara lätt att hitta.

  - **And** sidan ska innehålla en tydlig knapp för att gå vidare mot checkout.


