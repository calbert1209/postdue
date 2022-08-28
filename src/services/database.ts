import { Database } from "../../deps.ts";
import { AuthCookie } from "./schema.ts";

export const init = async (seed = false) => {
  const db = new Database<AuthCookie>("./src/data/cookies.json");

  if (seed) {
    await db.insertMany([
      {
        host: "localhost:3005",
        name: "X-Auth-Dev",
        value: "123456789",
      },
      {
        host: "app.shippio.jp",
        name: "X-Auth-p",
        value: "777888999000",
      },
    ]);
  }

  return db;
};
