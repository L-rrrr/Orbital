import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { db } from "../../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from '../../contexts/authContext';
import './CreatePost.css';

const CreatePost = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const setNewPostTitle = (e) => {
    const title = e.target.value;
    if (title.length > 50) {
      alert("Title must be less than 50 characters!");
    } else {
      setPostTitle(title);
    }
  };

  const setNewPostBody = (e) => {
    setPostBody(e.target.value);
  };

  const createPost = async () => {
    if (postTitle === "" || postBody === "") {
      alert("Please fill in both post title and post body");
      return;
    }

    const docRef = await addDoc(collection(db, "forumPosts"), {
      title: postTitle,
      body: postBody,
      createdAt: serverTimestamp(),
      uid: currentUser.uid,
      email: currentUser.email,
      displayName: currentUser.displayName || currentUser.email,
      photoURL: currentUser.photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
      upvotes: 0,
      upvotedBy: []
    });

    setPostTitle("");
    setPostBody("");
    alert("Post created!");
    navigate('/forum');
  };

  return (
    <div id="create-post-container">
      <h2 id="create-post-heading">Create a post</h2>
      <div id="create-post-input-container">
        <textarea
          className="create-post"
          id="create-post-title"
          value={postTitle}
          onChange={setNewPostTitle}
          placeholder={"Title of post (max 50 characters)"}
          maxLength={50}
        />
        <textarea
          className="create-post"
          id="create-post-body"
          value={postBody}
          onChange={setNewPostBody}
          placeholder={"Write down your thoughts here :)"}
        />
      </div>
      <div id="buttons-container">
        <button className="button-create-post-page">
          <NavLink id="nav-link-back-to-forum" to='/forum'>Back to forum</NavLink>
        </button>
        <button className="button-create-post-page" onClick={createPost}>
          Create Post   
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
