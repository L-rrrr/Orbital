import { auth, storage, db } from "./firebase"; // make sure to import db here
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { writeBatch, doc, getDocs, collection, collectionGroup, query, where } from "firebase/firestore"; // import necessary Firestore functions

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};

// Upload function to handle profile photo upload
export const uploadPhoto = async (file, currentUser, setLoading, setCurrentUser) => {
  if (!currentUser || !currentUser.uid) {
    console.error("Invalid currentUser:", currentUser);
    return;
  }

  const fileRef = ref(storage, `profile/${currentUser.uid}/${file.name}`);
  setLoading(true);

  try {
    await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    await updateProfile(auth.currentUser, { photoURL });

    // Update the currentUser state with the new data
    setCurrentUser((prev) => ({ ...prev, photoURL }));

    setLoading(false);
    alert("Uploaded file! Refresh to see changes.");

    // Update the photoURL in comments, replies, and forumPosts
    const batch = writeBatch(db);

    // Fetch all comments made by the current user
    const commentsQuerySnapshot = await getDocs(query(collectionGroup(db, "comments"), where("uid", "==", currentUser.uid)));
    commentsQuerySnapshot.forEach((doc) => {
      batch.update(doc.ref, { photoURL });
    });

    // Fetch all replies made by the current user
    const repliesQuerySnapshot = await getDocs(query(collectionGroup(db, "replies"), where("uid", "==", currentUser.uid)));
    repliesQuerySnapshot.forEach((doc) => {
      batch.update(doc.ref, { photoURL });
    });

    // Fetch all forum posts made by the current user
    const postsQuerySnapshot = await getDocs(query(collection(db, "forumPosts"), where("uid", "==", currentUser.uid)));
    postsQuerySnapshot.forEach((doc) => {
      batch.update(doc.ref, { photoURL });
    });

    await batch.commit();

  } catch (error) {
    setLoading(false);
    console.error("Error uploading photo:", error);
    alert("Failed to upload photo");
  }
};

// Function to handle username update
export const updateUsername = async (username, currentUser, setLoading, setCurrentUser) => {
  if (!currentUser || !currentUser.uid) {
    console.error("Invalid currentUser:", currentUser);
    return;
  }

  setLoading(true);

  try {
    await updateProfile(auth.currentUser, { displayName: username });

    // Update the currentUser state with the new data
    setCurrentUser((prev) => ({ ...prev, displayName: username }));

    // Update the displayName in comments, replies, and forumPosts
    const batch = writeBatch(db);

    // Fetch all comments made by the current user
    const commentsQuerySnapshot = await getDocs(query(collectionGroup(db, "comments"), where("uid", "==", currentUser.uid)));
    commentsQuerySnapshot.forEach((doc) => {
      batch.update(doc.ref, { displayName: username });
    });

    // Fetch all replies made by the current user
    const repliesQuerySnapshot = await getDocs(query(collectionGroup(db, "replies"), where("uid", "==", currentUser.uid)));
    repliesQuerySnapshot.forEach((doc) => {
      batch.update(doc.ref, { displayName: username });
    });

    // Fetch all forum posts made by the current user
    const postsQuerySnapshot = await getDocs(query(collection(db, "forumPosts"), where("uid", "==", currentUser.uid)));
    postsQuerySnapshot.forEach((doc) => {
      batch.update(doc.ref, { displayName: username });
    });

    await batch.commit();

    setLoading(false);
    alert("Username updated! Refresh to see changes.");
  } catch (error) {
    setLoading(false);
    console.error("Error updating username:", error);
    alert("Failed to update username");
  }
};
