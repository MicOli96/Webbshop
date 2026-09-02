# Hur man kör projektet

Projektet består av två delar som körs var för sig:

- `web/` — React + TypeScript-frontend (Vite, MUI)
- `api/` — Express + TypeScript-backend (Prisma + SQLite)

## Förutsättningar

- [Node.js](https://nodejs.org/) 20 eller senare
- npm (följer med Node)

## 1. Starta API:et

```bash
cd api
npm install
```

Skapa databasen (körs bara första gången, eller om `api/prisma/dev.db` saknas):

```bash
npx prisma migrate dev
npx prisma db seed
```

Starta API:et:

```bash
npm run dev
```

API:et körs nu på `http://localhost:3001` (t.ex. `http://localhost:3001/api/products`).

## 2. Starta webben

Öppna en ny terminal:

```bash
cd web
npm install
npm run dev
```

Webben körs nu på `http://localhost:5173`. Under utveckling skickar Vite automatiskt vidare alla anrop till `/api/...` till API:et på port 3001 — ingen extra konfiguration behövs.

**Båda delarna måste vara igång samtidigt** för att sidan ska kunna ladda produkter.

## Nollställa databasen

Vill du återställa produkterna till startläget (t.ex. efter att ha lekt med admin-sidan):

```bash
cd api
npx prisma db seed
```

Detta raderar alla produkter och ordrar och lägger tillbaka de ursprungliga seed-produkterna.

## Bygga för produktion

```bash
cd web
npm run build     # skapar web/dist

cd api
npm run build      # skapar api/dist
npm run start        # kör den byggda API:et med node
```

## Miljövariabler (`api/.env`)

| Variabel | Standardvärde | Beskrivning |
|---|---|---|
| `DATABASE_URL` | `file:./dev.db` | Var SQLite-databasfilen ligger |
| `PORT` | `3001` | Port som API:et lyssnar på |

`api/.env` skapas inte automatiskt av git (den är gitignorad) — kopiera `api/.env.example` till `api/.env` om filen saknas.
