import { Database } from "../../deps.ts";
import { AuthCookie } from "./schema.ts";

interface IAloeDatabase<T> {
  insertMany: (many: T[]) => Promise<T[]>;
  findOne: (part: Partial<T>) => Promise<T | null>;
  updateOne: (query: Partial<T>, next: T) => Promise<T | null>;
  insertOne: (entry: T) => Promise<T>;
}

export class AuthCookieDatabase {
  private constructor(private db: IAloeDatabase<AuthCookie>) {}

  static init = async (seed = false) => {
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

    return new AuthCookieDatabase(db);
  };

  upsert = async (
    query: Partial<AuthCookie>,
    next: AuthCookie,
  ) => {
    const found = await this.db.findOne(query);
    if (found) {
      return this.db.updateOne(found, next);
    }

    return this.db.insertOne(next);
  };

  findOne = (partial: Partial<AuthCookie>) => this.db.findOne(partial);
}
