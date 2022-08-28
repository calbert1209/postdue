import { copyText, getToken, HOST_NAME_MAP, postToken } from "./dom.js";

const KEY = HOST_NAME_MAP[globalThis.location.host];

getToken(KEY)
  .then((token) => {
    copyText(token);
    return postToken(KEY, token);
  })
  .then((resp) => resp.json())
  .then((json) => globalThis.alert(`${JSON.stringify(json)}`))
  .catch((err) => globalThis.alert(err));
