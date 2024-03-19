import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { messaging } from "firebase/messaging";

const firebaseConfig = {
  // Your Firebase configuration
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const requestNotificationPermission = () => {
  return messaging.requestPermission();
};

export const getToken = () => {
  return messaging.getToken();
};

export const onMessage = (callback) => {
  messaging.onMessage(callback);
};
