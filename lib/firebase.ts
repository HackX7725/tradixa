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
    if (serviceAccount.projectId && serviceAccount.clientEmail && serviceAccount.privateKey) {
      console.log("Initializing Firebase Admin for Auth...");
      return initializeApp({
        credential: cert(serviceAccount as any),
      });
    } else {
      console.warn("Firebase Admin credentials missing. Auth database will be unavailable.");
    }
  }
  return getApp();
};

export const adminApp = createFirebaseAdminApp();
export const adminDb = getFirestore(adminApp);
try {
  adminDb.settings({ ignoreUndefinedProperties: true });
} catch (e) {
  // Settings already applied or Firestore already in use
}
export const adminAuth = getAuth(adminApp);
