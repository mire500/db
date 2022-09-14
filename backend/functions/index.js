const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();
admin.initializeApp(functions.config().firebase);
app.use(cors({ origin: true }));
// read all user + get all data 
app.get("/", async (req, res) => {
    const snapshot = await admin.firestore().collection("users").get();

    let users = [];
    snapshot.forEach((doc) => {
        let id = doc.id;
        let data = doc.data();

        users.push({ id, ...data });
    });

    res.status(200).send(JSON.stringify(users));
});

// geting user by Id 
app.get("/:id", async (req, res) => {
    const snapshot = await admin.firestore().collection('users').doc(req.params.id).get();

    const userId = snapshot.id;
    const userData = snapshot.data();

    res.status(200).send(JSON.stringify({ id: userId, ...userData }));
})

// post - add users 
app.post("/", async (req, res) => {
    const user = req.body;

    await admin.firestore().collection("users").add(user);

    res.status(201).send();
});
// update the user - update user data
app.put("/:id", async (req, res) => {
    const body = req.body;

    await admin.firestore().collection('users').doc(req.params.id).update(body);

    res.status(200).send()
});
// delete users 
app.delete("/:id", async (req, res) => {
    await admin.firestore().collection("users").doc(req.params.id).delete();

    res.status(200).send();
})





// read all user + get all data 
app.get("/", async (req, res) => {
    const snapshot = await admin.firestore().collection("booking").get();

    let bookInfo = [];
    snapshot.forEach((doc) => {
        let id = doc.id;
        let data = doc.data();

        bookInfo.push({ id, ...data });
    });

    res.status(200).send(JSON.stringify(bookInfo));
});

// geting user by Id 
app.get("/:id", async (req, res) => {
    const snapshot = await admin.firestore().collection('booking').doc(req.params.id).get();

    const bookInfoId = snapshot.id;
    const bookData = snapshot.data();

    res.status(200).send(JSON.stringify({ id: bookInfoId, ...bookData }));
})

// post - add Booking
app.post("/", async (req, res) => {
    const bookInfo = req.body;

    await admin.firestore().collection("booking").add(bookInfo);

    res.status(201).send();
});
// update the user - update user data
app.put("/:id", async (req, res) => {
    const body = req.body;

    await admin.firestore().collection('booking').doc(req.params.id).update(body);

    res.status(200).send()
});
// delete users 
app.delete("/:id", async (req, res) => {
    await admin.firestore().collection("booking").doc(req.params.id).delete();

    res.status(200).send();
})


exports.booking = functions.https.onRequest(app);
exports.user = functions.https.onRequest(app);
// exports.booking = functions.https.onRequest(app);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
