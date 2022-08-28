import { json, opine } from "../deps.ts";
import * as database from "./services/database.ts";
import { isAuthCookieEntry, isValidQuery } from "./shared/validation.ts";

const db = await database.AuthCookieDatabase.init();
const app = opine();

app.use(json());
app.use(function (_, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

app.get("/test", (_, res) => {
  res.send("Hello friends, I hope you are well!");
});

app.get("/query", async (request, response) => {
  const sendNotFound = () => response.sendStatus(404);

  const { query } = request;
  if (!isValidQuery(query)) {
    sendNotFound();
    return;
  }

  try {
    const { name, host } = query;
    const found = await db.findOne({ name, host });
    if (!found) {
      sendNotFound();
      return;
    }

    console.log(`${name}@${host} requested`);
    response.send(JSON.stringify(found, null, 2));
  } catch (e) {
    response.setStatus(500).send(JSON.stringify({ error: e.message }));
  }
});

app.post("/post", async (request, response) => {
  const body = request.body;
  if (!isAuthCookieEntry(body)) {
    response.send(
      JSON.stringify({
        error: "body is not a valid entry",
        body: JSON.stringify(body),
      }),
    );
    return;
  }
  const { name, host } = body;
  const nextVersion = await db.upsert({ name, host }, body);
  response.send({
    msg: "post recvd",
    nextVersion,
  });
});

app.listen({ port: 8000 });
