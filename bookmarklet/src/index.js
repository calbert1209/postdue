import { alertResult, copyText, getToken, postToken } from "./dom.js";

const KEY = "X-Auth-p";

getToken(KEY)
  .then((token) => {
    copyText(token);
    return postToken(KEY, token);
  })
  .then((resp) => resp.json())
  .then((json) => alertResult("token sent", `${JSON.stringify(json)}`))
  .catch((err) => alertResult("error", err));
