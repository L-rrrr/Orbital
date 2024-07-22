import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { db } from "../../firebase/firebase";
import { doc, deleteDoc, updateDoc, arrayUnion, arrayRemove, serverTimestamp } from 'firebase/firestore';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { format } from 'date-fns';
import './Post.css';

const Post = ({ post }) => {
    const { currentUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(post.title);
    const [editedBody, setEditedBody] = useState(post.body);
    const [upvotes, setUpvotes] = useState(post.upvotes || 0);
    const [upvotedBy, setUpvotedBy] = useState(post.upvotedBy || []);
    const [displayName, setDisplayName] = useState(post.displayName);
    const [photoURL, setPhotoURL] = useState(post.photoURL);

    useEffect(() => {
        if (currentUser?.uid === post.uid) {
            setDisplayName(currentUser.displayName);
            setPhotoURL(currentUser.photoURL);
        }
    }, [currentUser, post.uid]);

    const deletePost = async () => {
        await deleteDoc(doc(db, "forumPosts", post.id));
    };

    const editPost = async () => {
        await updateDoc(doc(db, "forumPosts", post.id), {
            title: editedTitle,
            body: editedBody,
            updatedAt: serverTimestamp()
        });
        setIsEditing(false);
    };

    const handleUpvote = async () => {
        const postRef = doc(db, "forumPosts", post.id);
        if (upvotedBy.includes(currentUser.uid)) {
            // Remove upvote
            const newUpvotes = upvotes - 1;
            setUpvotes(newUpvotes);
            setUpvotedBy(upvotedBy.filter(uid => uid !== currentUser.uid));
            await updateDoc(postRef, {
                upvotes: newUpvotes,
                upvotedBy: arrayRemove(currentUser.uid)
            });
        } else {
            // Add upvote
            const newUpvotes = upvotes + 1;
            setUpvotes(newUpvotes);
            setUpvotedBy([...upvotedBy, currentUser.uid]);
            await updateDoc(postRef, {
                upvotes: newUpvotes,
                upvotedBy: arrayUnion(currentUser.uid)
            });
        }
    };

    const formatDate = (timestamp) => {
        return timestamp ? format(timestamp.toDate(), 'PPpp') : '';
    };

    return (
        <div className="post-container">
            <div className="post-header">
                <img src={photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} alt="User Profile" className="post-user-profile" />
                <div className="post-user-info">
                    {isEditing ? (
                        <input 
                            value={editedTitle} 
                            onChange={(e) => setEditedTitle(e.target.value)} 
                            className="edit-title-input"
                            maxLength={50}
                            placeholder="Title of post (max 50 characters)"
                        />
                    ) : (
                        <h2 className="post-title">{post.title}</h2>
                    )}
                    <p>Posted by: {displayName}</p>
                    <p>Created at: {formatDate(post.createdAt)} {post.updatedAt && `(Edited at: ${formatDate(post.updatedAt)})`}</p>
                </div>
                {currentUser.uid === post.uid && (
                    <div className="post-actions">
                        <button onClick={() => setIsEditing(!isEditing)} className="edit-post-button">
                            <EditIcon />
                        </button>
                        <button onClick={deletePost} className="delete-post-button">
                            <DeleteIcon />
                        </button>
                    </div>
                )}
            </div>
            <div className="post-body">
                {isEditing ? (
                    <textarea 
                        value={editedBody} 
                        onChange={(e) => setEditedBody(e.target.value)} 
                        className="edit-body-textarea"
                    />
                ) : (
                    <p>{post.body}</p>
                )}
                {isEditing && (
                    <div className="edit-actions">
                        <button onClick={editPost} className="submit-button">Save</button>
                        <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
                    </div>
                )}
            </div>
            <div className="post-footer">
                <button onClick={handleUpvote} className="upvote-button">
                    <ThumbUpIcon /> {upvotes}
                </button>
                <NavLink to={`/forum/${post.id}`} className="comments-link">Comments</NavLink>
            </div>
        </div>
    );
};

export default Post;
