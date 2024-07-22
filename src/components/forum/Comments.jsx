import React, { useState, useEffect } from 'react';
import { db } from "../../firebase/firebase";
import { collection, query, onSnapshot, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import Comment from './Comment';
import { useAuth } from '../../contexts/authContext';
//import './Comments.css';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const { currentUser } = useAuth();
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const q = query(collection(db, "generalPosts", postId, "comments"), orderBy('upvotes', 'desc'), orderBy('createdAt', 'asc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let commentsArray = [];
            querySnapshot.forEach((doc) => {
                commentsArray.push({ ...doc.data(), id: doc.id });
            });
            setComments(commentsArray);
        });

        return () => unsubscribe();
    }, [postId]);

    const addComment = async () => {
        if (newComment !== "") {
            await addDoc(collection(db, "generalPosts", postId, "comments"), {
                comment: newComment,
                createdAt: serverTimestamp(),
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName || currentUser.email,
                photoURL: currentUser.photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
                upvotes: 0,
                upvotedBy: []
            });
            setNewComment("");
        }
    };

    return (
        <div className="comments-container">
            <div className="create-comment-container">
                <textarea
                    placeholder="Write a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="create-comment-input"
                />
                <button onClick={addComment} className="submit-comment-button">Submit</button>
            </div>
            <div className="current-comments-container">
                {comments.map((comment) => (
                    <Comment key={comment.id} postId={postId} comment={comment} />
                ))}
            </div>
        </div>
    );
};

export default Comments;
