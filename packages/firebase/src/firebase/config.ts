const {
  FIREBASE_API_KEY: apiKey,
  FIREBASE_AUTH_DOMAIN: authDomain,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: projectId,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: storageBucket,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: messagingSenderId,
  NEXT_PUBLIC_FIREBASE_APP_ID: appId,
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: measurementId
} = process.env


export const config = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
}
export default config