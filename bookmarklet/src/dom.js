export const alertResult = (title, msg) => alert(`${title}\n${msg}`);

export const getToken = (key) =>
  window.cookieStore.get(key).then((c) => c.value);

export const copyText = (txt) => {
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

const URL = "http://localhost:8000/post";

export const postToken = (name, value) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, value, host: window.location.host }),
  };
  return globalThis.fetch(URL, options);
};
