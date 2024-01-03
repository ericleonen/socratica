import admin, { ServiceAccount } from "firebase-admin";
import * as creds from "@/secrets/adminKey.json";
import { getFirestore } from "firebase-admin/firestore";

const adminApp = admin.apps.length > 0 ? admin.app("adminApp") : admin.initializeApp({
    credential: admin.credential.cert(creds as ServiceAccount)
}, "adminApp");
export const db = getFirestore(adminApp);