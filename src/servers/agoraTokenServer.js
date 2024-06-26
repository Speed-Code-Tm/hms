const express = require('express');
const app = express();
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const firebase = require('firebase/app');
require('firebase/firestore');
const { v4: uuidv4 } = require('uuid');

const APP_ID = process.env.AGORA_APP_ID;
const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE;

const firebaseConfig = {
  // Your Firebase config
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

app.use(express.json());

app.post('/create-call', async (req, res) => {
  const { hospitalId, doctorId, patientId, duration } = req.body;
  const channelName = `${uuidv4()}-${Date.now()}`;
  const uid = 0;
  const expirationTimeInSeconds = 1800;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    RtcRole.PUBLISHER,
    privilegeExpiredTs
  );

  const callDetails = {
    hospitalId,
    callId: uuidv4(),
    doctorId,
    patientId,
    channelName,
    token,
    date: firebase.firestore.FieldValue.serverTimestamp(),
    duration,
  };

  try {
    const docRef = await db.collection('telemedicine').add(callDetails);
    res.status(200).json({ id: docRef.id, ...callDetails });
  } catch (error) {
    console.error('Error adding document:', error);
    res.status(500).json({ error: 'An error occurred while creating the call' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
