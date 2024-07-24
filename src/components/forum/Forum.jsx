import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { db } from "../../firebase/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { useAuth } from '../../contexts/authContext';
import Post from './Post';
import './Forum.css'; // Import the new CSS file

const Forum = () => {
    const { currentUser } = useAuth();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "forumPosts"), orderBy('upvotes', 'desc'), orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let postsArray = [];
            querySnapshot.forEach((doc) => {
                postsArray.push({ ...doc.data(), id: doc.id });
            });
            setPosts(postsArray);
        });

        return () => unsubscribe();
    }, [currentUser.uid]);

    return (
        <div className="forum-content-container">
            <h2 className="forum-title">Forum</h2>
            <NavLink to='/forum/createpost' className="create-post-button">Create Post</NavLink>
            <div className="forum-posts-container">
                {posts.map(post => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Forum;
