import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { doc, deleteDoc, updateDoc, collection, query, onSnapshot, orderBy, addDoc, serverTimestamp, arrayUnion, arrayRemove, collectionGroup, getDocs } from 'firebase/firestore';
import { useAuth } from '../../contexts/authContext';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import './Comment.css';
import { format } from 'date-fns';

const Comment = ({ postId, comment }) => {
  const { currentUser } = useAuth();
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [reply, setReply] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);
  const [upvotes, setUpvotes] = useState(comment.upvotes || 0);
  const [upvotedBy, setUpvotedBy] = useState(comment.upvotedBy || []);

  useEffect(() => {
    setUpvotes(comment.upvotes || 0);
    setUpvotedBy(comment.upvotedBy || []);
  }, [comment.upvotes, comment.upvotedBy]);

  const deleteComment = async () => {
    await deleteDoc(doc(db, "posts", postId, "comments", comment.id));
  };

  const addReply = async () => {
    if (reply !== "") {
      await addDoc(collection(db, "posts", postId, "comments", comment.id, "replies"), {
        comment: reply,
        createdAt: serverTimestamp(),
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName || currentUser.email,
        photoURL: currentUser.photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
      });
      setReply("");
      setShowReplyInput(false);
    }
  };

  const editComment = async () => {
    await updateDoc(doc(db, "posts", postId, "comments", comment.id), {
      comment: editedComment,
      updatedAt: serverTimestamp()
    });
    setIsEditing(false);
  };

  const handleUpvote = async () => {
    const commentRef = doc(db, "posts", postId, "comments", comment.id);
    if (upvotedBy.includes(currentUser.uid)) {
      // Remove upvote
      const newUpvotes = upvotes - 1;
      setUpvotes(newUpvotes);
      setUpvotedBy(upvotedBy.filter(uid => uid !== currentUser.uid));
      await updateDoc(commentRef, {
        upvotes: newUpvotes,
        upvotedBy: arrayRemove(currentUser.uid)
      });
    } else {
      // Add upvote
      const newUpvotes = upvotes + 1;
      setUpvotes(newUpvotes);
      setUpvotedBy([...upvotedBy, currentUser.uid]);
      await updateDoc(commentRef, {
        upvotes: newUpvotes,
        upvotedBy: arrayUnion(currentUser.uid)
      });
    }
  };

  const formatDate = (timestamp) => {
    return timestamp ? format(timestamp.toDate(), 'PPpp') : '';
  };

  return (
    <div id="comment-container">
      <div id="comment-img-container">
        <img id="user-comment-profile" src={comment.photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} alt="User Profile" />
        {currentUser.uid === comment.uid && (
          <div className="comment-actions">
            <button id="edit-comment" onClick={() => setIsEditing(!isEditing)}>
              <EditIcon />
            </button>
            <button id="delete-comment" onClick={deleteComment}>
              <DeleteIcon />
            </button>
          </div>
        )}
      </div>
      <div id="comment-content-container">
        <p id="comment-content-user">Created by: {comment.displayName}</p>
        <p id="comment-timestamp">Created at: {formatDate(comment.createdAt)} {comment.updatedAt && `(Edited at: ${formatDate(comment.updatedAt)})`}</p>
        {isEditing ? (
          <>
            <textarea
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              id="edit-comment-input"
            />
            <div className="edit-actions">
              <button onClick={editComment} className="submit-button">Save</button>
              <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
            </div>
          </>
        ) : (
          <p id="comment-content-body">{comment.comment}</p>
        )}
        <button onClick={() => setShowReplyInput(!showReplyInput)} className="reply-button">Reply</button>
        {showReplyInput && (
          <div id="reply-input-container">
            <textarea
              placeholder="Write a reply"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              id="reply-input"
            />
            <div className="reply-actions">
              <button onClick={addReply} className="submit-button">Submit</button>
              <button onClick={() => setShowReplyInput(false)} className="cancel-button">Cancel</button>
            </div>
          </div>
        )}
        <Replies postId={postId} commentId={comment.id} />
        <button onClick={handleUpvote} className="upvote-button">
          {upvotedBy.includes(currentUser.uid) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />} {upvotes}
        </button>
      </div>
    </div>
  );
};

const Replies = ({ postId, commentId }) => {
  const { currentUser } = useAuth();
  const [replies, setReplies] = useState([]);
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editedReply, setEditedReply] = useState("");

  useEffect(() => {
    const q = query(collection(db, "posts", postId, "comments", commentId, "replies"), orderBy('createdAt'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let replies = [];
      querySnapshot.forEach((doc) => {
        replies.push({ ...doc.data(), id: doc.id });
      });
      setReplies(replies);
    });

    return () => unsubscribe();
  }, [postId, commentId]);

  const deleteReply = async (replyId) => {
    await deleteDoc(doc(db, "posts", postId, "comments", commentId, "replies", replyId));
  };

  const editReply = async (replyId, newReply) => {
    await updateDoc(doc(db, "posts", postId, "comments", commentId, "replies", replyId), {
      comment: newReply,
      updatedAt: serverTimestamp()
    });
    setEditingReplyId(null);
  };

  const formatDate = (timestamp) => {
    return timestamp ? format(timestamp.toDate(), 'PPpp') : '';
  };

  return (
    <div id="replies-container">
      {replies.map((reply) => (
        <div key={reply.id} id="reply-container">
          <div id="reply-content">
            <img id="user-reply-profile" src={reply.photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} alt="User Profile" />
            <div className="reply-user-info">
              <p id="reply-user">{reply.displayName}</p>
              <p id="reply-timestamp">{formatDate(reply.createdAt)} {reply.updatedAt && `(Edited at: ${formatDate(reply.updatedAt)})`}</p>
            </div>
            {editingReplyId === reply.id ? (
              <>
                <textarea
                  value={editedReply}
                  onChange={(e) => setEditedReply(e.target.value)}
                />
                <div className="edit-actions">
                  <button onClick={() => editReply(reply.id, editedReply)} className="submit-button">Save</button>
                  <button onClick={() => setEditingReplyId(null)} className="cancel-button">Cancel</button>
                </div>
              </>
            ) : (
              <p className="reply-body">{reply.comment}</p>
            )}
            {currentUser.uid === reply.uid && (
              <div className="reply-actions">
                <button onClick={() => {
                  setEditingReplyId(reply.id);
                  setEditedReply(reply.comment);
                }}>
                  <EditIcon />
                </button>
                <button onClick={() => deleteReply(reply.id)}>
                  <DeleteIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
