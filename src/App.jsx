import "./styles/App.css";
import CommentInput from "./components/commentInput";
import CommentList from "./components/commentList";
import { getComments } from "./api/index";
import { useState, useEffect, createContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthorContext = createContext();

function App() {
  let authorId = Math.floor(Math.random() * 10 + 1);

  const [comments, setComments] = useState([]);
  const [author] = useState({
    id: authorId,
    display_picture: `https://res.cloudinary.com/liveweb/image/upload/ghost/${authorId}.jpg`,
  });

  useEffect(() => {
    let events = new EventSource("https://api.thoughtscoop.com/events");

    (async () => {
      setComments(await getComments());
      events.onmessage = async (event) => {
        let data = JSON.parse(event.data);
        if (data.type) setComments(await getComments());
      };
    })();
    return () => {
      events.close();
    };
  }, []);

  return (
    <AuthorContext.Provider value={author}>
      <ToastContainer
        autoClose={3000}
        position="bottom-center"
        closeButton={false}
        className={"toast"}
        hideProgressBar={true}
      />
      <div className="root">
        <div className="container">
          <h2 className="title">Discussion</h2>
          <div className="comment-input-container">
            <CommentInput parent={-1} />
          </div>

          <div className="divider-container">
            <div className="divider"></div>
          </div>

          {comments.length > 0 ? (
            <div className="comment-list-container">
              <CommentList comments={comments} />
            </div>
          ) : (
            <h2 className="no-comments-yet">No comments yet</h2>
          )}
        </div>
      </div>
    </AuthorContext.Provider>
  );
}

export default App;
