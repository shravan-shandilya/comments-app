const baseURL = "https://api.thoughtscoop.com";
const baseHeaders = new Headers({
  "Content-Type": "application/json",
});

function FetchRequest(url, requestOptions) {
  requestOptions["headers"] = baseHeaders;
  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (!result["success"]) {
        console.error(result);
        return Promise.reject(new Error(`${result["error"]}`));
      }
      return Promise.resolve(result["data"]);
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(error);
    });
}

async function getComments() {
  return (await FetchRequest(`${baseURL}/comments`, { method: "GET" }))[
    "comments"
  ];
}

function postComment(user_id, content, parent) {
  return FetchRequest(`${baseURL}/comments`, {
    method: "POST",
    body: JSON.stringify({ user_id, content, parent }),
  });
}

export { getComments, postComment };
