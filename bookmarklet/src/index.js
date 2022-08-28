const KEY = "X-Auth-p";
const URL = "http://localhost:8000/post";

const alertResult = (title, msg) => alert(`${title}\n${msg}`);
const getToken= (key) => window.cookieStore.get(key).then((c) => c.value);
const copyText = (txt) => {
  const node = document.createElement("textarea");
  node.textContent = txt;
  document.body.appendChild(node);
  const selection = document.getSelection();
  selection.removeAllRanges();
  node.select();
  document.execCommand("copy");
  selection.removeAllRanges();
  document.body.removeChild(node);
};
const postToken = (name, value) => {
  
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, value, host: window.location.host }),
  };
  return globalThis.fetch(URL, options);
};
getToken(KEY)
  .then((token) => {
    copyText(token);
    return postToken(KEY, token);
  })
  .then((resp) => resp.json())
  .then((json) => alertResult("token sent", `${JSON.stringify(json)}`))
  .catch((err) => alertResult("error", err));
