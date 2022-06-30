import { toast } from "react-toastify";

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
      toast.error("Something went wrong");
      return Promise.reject(error);
    });
}

async function getComment(comment_id) {
  return (
    await FetchRequest(`${baseURL}/comments/${comment_id}`, { method: "GET" })
  )["comment"];
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

function postVote(user_id, comment_id, type) {
  return FetchRequest(`${baseURL}/votes`, {
    method: "POST",
    body: JSON.stringify({ user_id, comment_id, type }),
  });
}

export { getComment, getComments, postComment, postVote };
