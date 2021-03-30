const functions = require('firebase-functions');

// Upload photos endpoint.
exports.uploadFile = functions.https.onRequest((req, res) => {
  res.status(200).json({
    message: 'API invoked successfully!',
  });
});
