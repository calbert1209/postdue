import { Database } from "https://deno.land/x/aloedb@0.9.0/mod.ts";
// import { join } from "https://deno.land/std@0.153.0/path/mod.ts";

// Structure of stored documents
interface Film {
  id: number;
  title: string;
}

export const init = async (seed = false) => {
  // Initialization
  // const dbPath = join('films.json');
  const db = new Database<Film>('./src/data/films.json');

  if (seed) {
    // Insert operations
    await db.insertMany([
      {
        id: 1,
        title: "Chappy",
      },
      {
        id: 2,
        title: "Elisium",
      },
      {
        id: 3,
        title: "District 9",
      },
    ]);
  }

  return db;
}

