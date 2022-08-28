import { json, opine } from "../deps.ts";
import * as database from "./services/database.ts";
import { isAuthCookie } from "./services/schema.ts";

const db = await database.AuthCookieDatabase.init();
const app = opine();

app.use(json());
app.use(function (_, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

app.get("/test", (_, res) => {
  res.send("Hello friends, I hope you are well!");
});

app.get("/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const found = await db.findOne({ name });
    if (found === null) throw new Error("nothing found");
    console.log(`${name} requested`);
    res.setHeader("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept",
    );
    res.send(JSON.stringify(found, null, 2));
  } catch (error) {
    res.send(JSON.stringify({ error: error.message }));
  }
});

app.post("/post", async (request, response) => {
  const body = request.body;
  if (!isAuthCookie(body)) {
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
