import { betterAuth } from "better-auth";
import { firestoreAdapter } from "better-auth-firestore";
import { adminDb } from "./firebase";

export const auth = betterAuth({
  database: adminDb
    ? firestoreAdapter({
        firestore: adminDb,
      })
    : undefined,
  emailAndPassword: {
    enabled: true,
  },
  // If you wish to add Google or other social logins later, you can add them here
  /*
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  */
  // trustHost is required in some environments to allow the session cookie to be set correctly
  advanced: {
    trustHost: true,
  },
  debug: true,
});
