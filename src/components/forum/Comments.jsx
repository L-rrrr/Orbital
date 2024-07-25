import React, { useState, useEffect } from 'react';
import { db } from "../../firebase/firebase";
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import Comment from './Comment';
import CreateComment from './CreateComment';
import { useAuth } from '../../contexts/authContext';
import './Comments.css'; // Import the new CSS file

const Comments = () => {
    const { postId } = useParams(); // Extract postId from the route parameters
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState(null);
    const [displayName, setDisplayName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!postId) {
            console.error("postId is not defined");
            return;
        }

        // Fetch the post data
        const fetchPost = async () => {
            const postDoc = await getDoc(doc(db, "forumPosts", postId));
            if (postDoc.exists()) {
                const postData = postDoc.data();
                setPost(postData);
                setDisplayName(postData.displayName);
                setPhotoURL(postData.photoURL);
            } else {
                console.error("Post not found");
            }
        };

        fetchPost();

        // Order by upvotes first, then by createdAt for tie-breaking
        const q = query(collection(db, "forumPosts", postId, "comments"), orderBy('upvotes', 'desc'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let commentsArray = [];
            querySnapshot.forEach((doc) => {
                commentsArray.push({ ...doc.data(), id: doc.id });
            });
            setComments(commentsArray);
        });

        return () => unsubscribe();
    }, [postId]);

    useEffect(() => {
        if (currentUser?.uid === post?.uid) {
            setDisplayName(currentUser.displayName);
            setPhotoURL(currentUser.photoURL);
        } else {
            const fetchUserData = async () => {
                if (post?.uid) {
                    const userDoc = await getDoc(doc(db, "users", post.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setDisplayName(userData.displayName);
                        setPhotoURL(userData.photoURL);
                    }
                }
            };
            fetchUserData();
        }
    }, [currentUser, post?.uid]);

    return (
        <div className="comments-page-container">
            <button className="back-button" onClick={() => navigate('/forum')}>Back to Forum</button>
            {post && (
                <div className="post-details">
                    <h2 className="post-title">{post.title}</h2>
                    <div className="post-user-info">
                        <img src={photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} alt="User Profile" className="post-user-profile" />
                        <p>Posted by: {displayName}</p>
                    </div>
                    <div className="post-content">
                        <p>{post.body}</p>
                    </div>
                </div>
            )}
            <CreateComment postId={postId} />
            <div className="current-comments-container">
                {comments.map((comment) => (
                    <Comment key={comment.id} postId={postId} comment={comment} />
                ))}
            </div>
        </div>
    );
};

export default Comments;
