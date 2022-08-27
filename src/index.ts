import opine, { json } from "https://deno.land/x/opine@2.2.0/mod.ts";
import * as database from './services/database.ts';

const db = await database.init()
const app = opine();

app.use(json());
app.use(function(_, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/test', (_, res) => {
  res.send('Hello friends, I hope you are well!');
});

app.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const found = await db.findOne({ id });
    if (found === null) throw new Error('nothing found');
    console.log(`id ${id} requested`);
    res.setHeader("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify(found, null, 2));
  } catch (error) {
    res.send(JSON.stringify({ error: error.message }));
  }
});

app.post('/post', (request, response) => {
  const body = request.body;
  console.log(`${new Date().toLocaleTimeString()} - Posted:`, JSON.stringify(body, null, 2));
  response.send({
    msg: 'post recvd',
    body,
  });
});

app.listen({ port: 8000 });