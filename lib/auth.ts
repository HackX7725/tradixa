import { betterAuth } from "better-auth";
import { firestoreAdapter } from "better-auth-firestore";
import { adminDb } from "./firebase";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: adminDb
    ? firestoreAdapter({
        firestore: adminDb,
      })
    : undefined,
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      scope: ["public_profile", "email"],
    },
  },
  trustHost: true,
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          console.log("DEBUG: User successfully created in Firestore:", user.email);
        },
      },
    },
  },
  onEvent: {
    onSessionCreated: (data: any) => {
      console.log("DEBUG: Session created for user:", data.session.userId);
    },
  },
  debug: true,
  plugins: [nextCookies()],
});
