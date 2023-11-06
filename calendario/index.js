/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.createFutureDocuments = functions.pubsub
    .schedule("every 24 hours")
    .timeZone("America/New_York")
    .onRun(async (context) => {
      const currentDate = new Date();
      const db = admin.firestore();
      const disponiblesRef = db.collection("disponibles");

      for (let i = 1; i <= 20; i++) {
        const futureDate = new Date();
        futureDate.setDate(currentDate.getDate() + i);
        const dateString = futureDate.toISOString().split("T")[0];

        // Verifica si ya existe un documento para este día antes de crearlo
        const existingDoc = await disponiblesRef.doc(dateString).get();
        if (!existingDoc.exists) {
          await disponiblesRef.doc(dateString).set({
            horas: [], // Inicialmente no hay horas disponibles
          });
        }
      }

      return null;
    });
