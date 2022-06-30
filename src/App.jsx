import "./styles/App.css";
import CommentInput from "./components/commentInput";
import CommentList from "./components/commentList";
import { getComments } from "./api/index";
import { useState, useEffect, createContext } from "react";

export const AuthorContext = createContext();

function App() {
  let authorId = Math.floor(Math.random() * 10 + 1);

  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState({
    id: authorId,
    display_picture: `https://res.cloudinary.com/liveweb/image/upload/ghost/${authorId}.jpg`,
  });

  useEffect(() => {
    (async () => {
      console.log("fetched comments");
      setComments(await getComments());
    })();
  }, []);

  return (
    <AuthorContext.Provider value={author}>
      <div className="root">
        <div className="container">
          <h2 className="title">Discussion</h2>
          <div className="comment-input-container">
            <CommentInput
              parent={-1}
              onUpdate={async () => {
                console.log("fetched comments");
                setComments(await getComments());
              }}
            />
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
