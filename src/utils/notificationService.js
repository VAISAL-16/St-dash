// src/utils/notificationService.js
import { db} from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { serverTimestamp } from "firebase/firestore";

export const sendNotification = async ({ title, message, role }) => {
  try {
    await addDoc(collection(db, 'notifications'), {
      title,
      message,
      role,
      timestamp: serverTimestamp(),
    });
    console.log('✅ Notification sent');
  } catch (error) {
    console.error('❌ Failed to send notification:', error);
  }
};
