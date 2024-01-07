import admin, { ServiceAccount } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount: ServiceAccount = {
    privateKey: process.env.FIREBASE_PRIVATE_KEY!,
    projectId: process.env.FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!
}

const adminApp = admin.apps.length > 0 ? admin.app("adminApp") : admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}, "adminApp");
export const db = getFirestore(adminApp);