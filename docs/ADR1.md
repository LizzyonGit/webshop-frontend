# 🏛️ Architecture Decision Record (ADR) Mall

> **Vad är en ADR?**  
> En ADR (Architecture Decision Record) är ett kortfattat dokument som fångar ett viktigt arkitektur- eller teknikbeslut, kontexten kring beslutet och dess konsekvenser. Spara era beslut i mappen `docs/` med namn som `ADR-001-val-av-databas.md`.

> ⚖️ **Tumregel: När ska vi skriva en ADR i detta projekt?**  
> * **Skriv INTE en ADR för allt!** Ni ska **endast skriva 1 (max 2) ADR:er för hela projektet**.
> * **Var?** Skriv den uteslutande för era **valbara fördjupningsmoduler** eller ert största tekniska vägval (t.ex. *Val av state-hantering för varukorg*, *Val av Auth-tjänst*, eller *Val av molndatabas*).
> * **När behövs INTE en ADR?** Skriv aldrig en ADR för UI-styling, vanliga React-komponenter, sidlayouter eller buggfixar.

---

# ADR-1: [Designsystem & UI]

* **Status:** [ ~~Föreslagen~~ | Beslutad | ~~Ersatt | Förkastad~~ ]
* **Datum:** 2026-09-22
* **Deltagare:** Leo, Lizzy, Patrick, Perjin, David
* **Relaterad Issue/Ticket:** #[Issue-nummer på GitHub]

---

## 1. Kontext & Problemställning
*Vilken utmaning eller vilket behov står vi inför? Vilka krav och begränsningar styr oss?*

*Vi behöver enhetlig styling.*

---

## 2. Övervägda Alternativ

### Alternativ A: ingen shadcn/ui (ren css/Tailwind)
* **Fördelar:** Vi behöver inte lägga tid på att sätta oss in i det
* **Nackdelar:** Vi ska hantera enhetlighet på ett annat sätt ändå
### Alternativ B: shadcn/ui med Tailwind/css
* **Fördelar:** Lätt att det blir enhetlig styling
* **Nackdelar:** Tar tid att sätta oss in i det.


---

## 3. Beslut
*Vilket alternativ valde vi och varför?*

*Exempel: Vi beslutar att använda **Alternativ B: shadcn/ui med Tailwind/css**. Detta ger oss ett ramverk som vi kan bygga vår enhetliga styling på. Vi lär oss ett nytt sätt att styla komponenter på.*
---

## 4. Konsekvenser

### Positiva konsekvenser
* Teamet får ett standardiserat gränssnitt för applikationen som kan återanvändas för olika komponenter utan att behöva radera existerande Tailwind-kod.
* Kunden får ett igenkännbart gränssnitt för alla sidor som kunden besöker.
* Enkelt att ställa in och använda från första början.

### Negativa konsekvenser / Risker
* Shadcn är nytt för teamet och kräver att vi sätter oss in i det innan vi börjar koda.

---

## 5. Hur vi verifierar beslutet
*Hur vet vi att beslutet var lyckat?*

* [ ] Bra överblick av stylingkomponenter
* [ ] Enghetlig styling utan för mycket eget CSS
* [ ] Återanvända komponenter
