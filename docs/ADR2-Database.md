# 🏛️ Architecture Decision Record (ADR) - Database [PROPOSAL]

---

# ADR-2: [Database]

* **Status:** [ Föreslagen | ~~Beslutad~~ | ~~Ersatt | Förkastad~~ ]
* **Datum:** 2026-09-29
* **Deltagare:** Leo, Lizzy, Patrick, Perjin, David
* **Relaterad Issue/Ticket:** #[36]

---

## 1. Kontext & Problemställning
*Vilken utmaning eller vilket behov står vi inför? Vilka krav och begränsningar styr oss?*

- Vi vill använda Supabase (PostgreSQL) tillsammans med Prisma 7 ORM.
- Vi vill kunna använda databasen för att ersätta API för att få bättre kontroll på våran data i webshoppen.
- Vi kan använda oss av product/[slug] istället för product/[id] vilket är bättre för SEO.
- Kommer att kräva en del jobb i backend för att få till search, filter, sort och pagination.
- Vi kan också lagra bilderna lokalt i våran `/public/` folder.
Images: `/public/images/product-slug.webp`
Thumbnails: `/public/thumbnails/product-slug.webp`

- Databasen används också av våran implementering av BetterAuth för at kunna logga in och skapa konto samt kontrollera behörighet till vissa routes.
- Om vi skall Deploya sedan hos Vercel så stödjer Vercel Supabase.
- Vi måste också migrera bas koden för admin dashboard från API till Databasen så att vi använder databasen överallt i våran applikation.
- När man skapar en ny produkt så generaras det en ny unik SKU samt produkt slug.
- Använda Full Text Search med tsVector vid search funktionalitet för snabb sökningar och sökningar baserad på ranking. Rakning in this order: title, description sedancategory/brand.

```sql
ALTER TABLE "products"
ADD COLUMN "search_vector" tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('english', coalesce("title", '')), 'A') ||
  setweight(to_tsvector('english', coalesce("description", '')), 'B') ||
  setweight(to_tsvector('english', coalesce("category", '')), 'C') ||
  setweight(to_tsvector('english', coalesce("brand", '')), 'C')
) STORED;

CREATE INDEX "products_search_vector_idx"
ON "products"
USING GIN ("search_vector");
```

---

## 2. Övervägda Alternativ

### Alternativ A: ingen database och vi behåller API
* **Fördelar:** Vi behöver inte lägga tid på att sätta oss in i det
* **Nackdelar:** Kräver en del extra jobb i backend för att lösa search, pagination mm.
### Alternativ B: Vi använder databasen
* **Fördelar:** Vi får full kontroll över våran backend och data.
* **Nackdelar:** Tar tid att sätta oss in i det.

---

## 3. Beslut
*Vilket alternativ valde vi och varför?*

*Exempel: Vi beslutar att använda **Alternativ B: Databasen**. Detta ger oss full kontroll och vi får lära oss något nytt.*
---

## 4. Konsekvenser

### Positiva konsekvenser
* Vi får full kontroll över våran databas och data.
* Kunden kommer inte att se några skillnader i frontend.
* Vi kan implementera att använda produkt slug istället för produkt id.

### Negativa konsekvenser / Risker
* Databasen är nytt för dom flesta i gruppen. Kan kräva extra jobb att lära sig. Men vi kommer att ha exempel kod som man kan använda sig av när man skapar riktiga koden.

---

## 5. Hur vi verifierar beslutet
*Hur vet vi att beslutet var lyckat?*

* [ ] Att vi kan hämta produkt information från databasen.
* [ ] Funktionalitet som fungerar med produkt listan som search, filter, sort och pagination.
* [ ] Att en specifik produkt visas när man använder URL: http://localhost:3000/product-slug/
* [ ] Att man skall kunna skapa en produkt och lägga in datan i databasen.
* [ ] När man lägger till en produkt så kan man ladda upp en image och en thumbnail för produkten. 
