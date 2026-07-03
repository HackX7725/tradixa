import { initializeApp, getApps, cert, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n").replace(/^"(.*)"$/, '$1');

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: privateKey,
};

const createFirebaseAdminApp = () => {
  if (getApps().length === 0) {
    if (serviceAccount.projectId && serviceAccount.clientEmail && serviceAccount.privateKey) {
      console.log("Initializing Firebase Admin for Auth...");
      const storageBucket = process.env.FIREBASE_STORAGE_BUCKET || "tradixa-f1af4.appspot.com";
      console.log("Firebase Admin Storage Bucket (Initialized):", storageBucket);
      return initializeApp({
        credential: cert(serviceAccount as any),
        storageBucket: storageBucket,
      });
    } else {
      console.warn("Firebase Admin credentials missing. Auth database will be unavailable.");
      return undefined;
    }
  }
  try {
    return getApp();
  } catch (e) {
    return undefined;
  }
};

export const adminApp = createFirebaseAdminApp();
export const adminDb = adminApp ? getFirestore(adminApp) : undefined;
if (adminDb) {
  try {
    adminDb.settings({ ignoreUndefinedProperties: true });
  } catch (e) {
    // Settings already applied or Firestore already in use
  }
}
export const adminAuth = adminApp ? getAuth(adminApp) : undefined;
