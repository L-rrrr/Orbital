import React, { useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from '../../contexts/authContext';
//import './CreateComment.css';

const CreateComment = ({ postId }) => {
  const { currentUser } = useAuth();
  const [comment, setComment] = useState("");

  const addComment = async () => {
    if (comment !== "") {
      await addDoc(collection(db, "forumPosts", postId, "comments"), {
        comment: comment,
        createdAt: serverTimestamp(),
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName || currentUser.email,
        photoURL: currentUser.photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
        upvotes: 0 // Initialize upvotes to 0
      });
      setComment("");
    }
  };

  return (
    <div id="create-comment-container">
      <textarea
        placeholder="Write a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        id="create-comment-input"
      />
      <button id="submit-comment-button" onClick={addComment}>Submit</button>
    </div>
  );
};

export default CreateComment;
