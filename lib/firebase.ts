import { initializeApp, getApps, cert, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

const createFirebaseAdminApp = () => {
  if (getApps().length === 0) {
    // Only initialize if we have the credentials, to avoid crashing during build
    if (serviceAccount.projectId && serviceAccount.clientEmail && serviceAccount.privateKey) {
      return initializeApp({
        credential: cert(serviceAccount as any),
      });
    }
  }
  return getApp();
};

export const adminApp = createFirebaseAdminApp();
export const adminDb = getApps().length > 0 ? getFirestore(adminApp) : null;
export const adminAuth = getApps().length > 0 ? getAuth(adminApp) : null;
