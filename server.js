const express = require("express");
const admin = require("firebase-admin");

const serviceAccount = require("./firebase-service-account.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
const PORT = 3000;

app.get("/users", async (req, res) => {
    const snapshot = await db.collection("users").get();

    const users = snapshot.docs.map(doc => doc.data());

    res.json(users);
});

app.listen(PORT, () => {
    console.log("Server running on port 3000");
});