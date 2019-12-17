// //import * as functions from 'firebase-functions';

// // // Start writing Firebase Functions
// // // https://firebase.google.com/docs/functions/typescript
// //
// // export const helloWorld = functions.https.onRequest((request, response) => {
// //  response.send("Hello from Firebase!");
// // });
// const functions = require('firebase-functions');
// const admin = require('firebase-admin')
// admin.initializeApp(functions.config().firebase)

// const mkdirp = require('mkdirp-promise');
// // Include a Service Account Key to use a Signed URL
// const gcs = require('@google-cloud/storage')({ keyFilename: 'service-account-credentials.json' });

// const spawn = require('child-process-promise').spawn;
// const path = require('path');
// const os = require('os');
// const fs = require('fs');

// // Max height and width of the thumbnail in pixels.
// const THUMB_MAX_HEIGHT = 200;
// const THUMB_MAX_WIDTH = 200;
// // Thumbnail prefix added to file names.
// const THUMB_PREFIX = 'thumb_';


// exports.helloWorld = functions.https.onRequest((request: any, response: { send: (arg0: string) => void; }) => {
//     response.send("Hello from Firebase!");
// });

// const createNotification = ((notification: any) => {
//     return admin.firestore().collection('notifications').add(notification).then((doc: any) => console.log('notification added', doc))
// })

// exports.itineraryCreated = functions.firestore
//     .document('itineraries/{itinerariesId}').onCreate((doc: { data: () => any; id: any; }, context: any) => {

//         const itinerary = doc.data();
//         console.log(doc.id)
//         const notification = {
//             content: 'Added a new itinerary for ' + itinerary.cityName,
//             user: `${itinerary.authorFirstName} ${itinerary.authorLastName}`,
//             time: admin.firestore.FieldValue.serverTimestamp(),
//             itineraryId: doc.id,
//             cityName: itinerary.cityName

//         }
//         return createNotification(notification)
//     })

// exports.cityCreated = functions.firestore
//     .document('cities/{citiesId}').onCreate((doc: { data: () => any; id: any; }, context: any) => {

//         const city = doc.data();
//         const notification = {
//             content: 'Added a new city: ' + city.cityName + ", " + city.countryName,
//             user: `${city.authorFirstName} ${city.authorLastName}`,
//             time: admin.firestore.FieldValue.serverTimestamp(),
//             cityId: doc.id,
//             cityName: city.cityName

//         }
//         return createNotification(notification)
//     })

// exports.userJoined = functions.auth.user().onCreate((user: { uid: any; }) => {
//     return admin.firestore().collection('users')
//         .doc(user.uid).get().then((doc: { data: () => any; }) => {
//             const newUser = doc.data()
//             const notification = {
//                 content: 'Joined',
//                 user: `${newUser.firstName} ${newUser.lastName}`,
//                 time: admin.firestore.FieldValue.serverTimestamp()
//             }
//             return createNotification(notification)

//         })
// })
// /*
// exports.generateThumbnail = functions.storage.object().onFinalize((object) => {
//     // File and directory paths.
//     const filePath = object.name;
//     const contentType = object.contentType; // This is the image MIME type
//     const fileDir = path.dirname(filePath);
//     const fileName = path.basename(filePath);
//     const thumbFilePath = path.normalize(path.join(fileDir, `${THUMB_PREFIX}${fileName}`));
//     const tempLocalFile = path.join(os.tmpdir(), filePath);
//     const tempLocalDir = path.dirname(tempLocalFile);
//     const tempLocalThumbFile = path.join(os.tmpdir(), thumbFilePath);

//     // Exit if this is triggered on a file that is not an image.
//     if (!contentType.startsWith('image/')) {
//         console.log('This is not an image.');
//         return null;
//     }

//     // Exit if the image is already a thumbnail.
//     if (fileName.startsWith(THUMB_PREFIX)) {
//         console.log('Already a Thumbnail.');
//         return null;
//     }
//     if (object.size <= 1000000) {
//         console.log('Size already inferior to 1Mb')
//         return null;
//     }



//     // Cloud Storage files.
//     const bucket = gcs.bucket(object.bucket);
//     const file = bucket.file(filePath);
//     const thumbFile = bucket.file(thumbFilePath);
//     const metadata = {
//         contentType: contentType,
//         // To enable Client-side caching you can set the Cache-Control headers here. Uncomment below.
//         // 'Cache-Control': 'public,max-age=3600',
//     };

//     // Create the temp directory where the storage file will be downloaded.
//     return mkdirp(tempLocalDir).then(() => {
//         // Download file from bucket.
//         return file.download({ destination: tempLocalFile });
//     }).then(() => {
//         console.log('The file has been downloaded to', tempLocalFile);
//         // Generate a thumbnail using ImageMagick.
//         return spawn('convert', [tempLocalFile, '-thumbnail', `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>`, tempLocalThumbFile], { capture: ['stdout', 'stderr'] });
//     }).then(() => {
//         console.log('Thumbnail created at', tempLocalThumbFile);
//         // Uploading the Thumbnail.
//         return bucket.upload(tempLocalThumbFile, { destination: thumbFilePath, metadata: metadata });
//     }).then(() => {
//         console.log('Thumbnail uploaded to Storage at', thumbFilePath);
//         // Once the image has been uploaded delete the local files to free up disk space.
//         fs.unlinkSync(tempLocalFile);
//         fs.unlinkSync(tempLocalThumbFile);
//         // Get the Signed URLs for the thumbnail and original image.
//         const config = {
//             action: 'read',
//             expires: '03-01-2500',
//         };
//         return Promise.all([
//             thumbFile.getSignedUrl(config),
//             file.getSignedUrl(config),
//         ]);
//     }).then((results) => {
//         console.log('Got Signed URLs.');
//         const thumbResult = results[0];
//         const originalResult = results[1];
//         const thumbFileUrl = thumbResult[0];
//         const fileUrl = originalResult[0];
//         // Add the URLs to the Database
//         return admin.database().ref('images').push({ path: fileUrl, thumbnail: thumbFileUrl });
//     }).then(() => console.log('Thumbnail URLs saved to database.'));
// });*/


// exports.generateThumbnail = functions.storage.object().onFinalize((object: { bucket: any; name: any; metadata: any; size: number; }) => {
//     console.log(object)
//     // Download file from bucket.
//     const bucket = gcs.bucket(object.bucket);

//     const filePath = object.name
//     const tempFilePath = `/tmp/${filePath}`;
//     const metadata = object.metadata
//     const tempLocalFile = path.join(os.tmpdir(), filePath);
//     const tempLocalDir = path.dirname(tempLocalFile);

//     // if (metadata.isThumb) {
//     //     console.log('Exiting: Already a thumbnail')
//     //     return null
//     // }
//     if (object.size <= 1000000) {
//         console.log('Size already inferior to 1Mb')
//         return null;
//     }



//     return mkdirp(tempLocalDir).then(() => {
//         // Download file from bucket.
//         return bucket.file(filePath).download({ destination: tempFilePath });
//     }).then(() => {
//         console.log('Image downloaded locally to', tempFilePath);
//         // Generate a thumbnail using ImageMagick.
//         return spawn('convert', [tempFilePath, '-thumbnail', '700x700>', tempFilePath])
//             .then((_: any) => {
//                 metadata.isThumb = true               // We add custom metadata
//                 const options = {
//                     destination: filePath,            // Destination is the same as original
//                     metadata: { metadata: metadata }
//                 }
//                 // Overwrite the original path
//                 return bucket.upload(tempFilePath, options)
//             })
//     });

// })