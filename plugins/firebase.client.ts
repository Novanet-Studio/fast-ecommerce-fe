import { initializeApp } from 'firebase/app';
import {
  getFunctions,
  httpsCallable,
  // connectFunctionsEmulator,
} from 'firebase/functions';
import type { FirebaseOptions } from 'firebase/app';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig: FirebaseOptions = {
    apiKey: config.public.FIREBASE_API_KEY,
    authDomain: config.public.FIREBASE_AUTH_DOMAIN,
    projectId: config.public.FIREBASE_PROJECT_ID,
    storageBucket: config.public.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: config.public.FIREBASE_MESSAGING_SENDER_ID,
    appId: config.public.FIREBASE_ID,
    measurementId: config.public.FIREBASE_MEASURENT_ID,
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const functions = getFunctions(firebaseApp);

  // connectFunctionsEmulator(functions, 'localhost', 5001);
  nuxtApp.vueApp.provide('httpsCallable', (name: string) =>
    httpsCallable(functions, name)
  );

  nuxtApp.provide('httpsCallable', (name: string) =>
    httpsCallable(functions, name)
  );
});
