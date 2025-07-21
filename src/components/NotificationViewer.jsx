import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';

const NotificationViewer = ({ role }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'notifications'),
      where('role', '==', role),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotifications(data);
    });

    return () => unsubscribe();
  }, [role]);

  return (
    <div className="space-y-2">
      {notifications.length === 0 && (
        <div className="text-gray-500 text-sm">No notifications yet.</div>
      )}
      {notifications.map((n) => (
        <div key={n.id} className="p-2 border rounded-md bg-gray-50 dark:bg-gray-800">
          <div className="font-semibold">{n.title}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">{n.message}</div>
        </div>
      ))}
    </div>
  );
};

export default NotificationViewer;
