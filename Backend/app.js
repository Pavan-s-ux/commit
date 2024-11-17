const {google} = require('googleapis');
const path = require('path')
const fs = require('fs')
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;



const CLIENT_ID = '16768062663-i5v43pf8eu3udprak46hdqvs96ictm4l.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'

const REFRESH_TOKEN = '1//04AYOmjxJTAnBCgYIARAAGAQSNwF-L9IroaEjEVmJtHgc4Sqxy6QXk-10rbjeYb1dHgInfXxEL6-QL-ec3WHJNs21CmhDdSumqxw'

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

const filepath = path.join(__dirname, 'test.jpg')


async function uploadFile() {
    try {

        const response = await drive.files.create({
            requestBody:{
                name:'test.jpg',
                mimeType: 'image/jpg'
            },
            media:{
                mimeType: 'image/jpg',
                body: fs.createReadStream(filepath)
            }
        });

        console.log('success:',response.data);
        
    } catch (error) {
        console.log(error.messag);
    }
}
app.get('/uploadFile', async (req, res) => {
    try {
        const uploadedFile = await uploadFile();  // Call the upload function
        res.status(200).json({
            message: 'File uploaded successfully'
        });
    } catch (error) {
        console.error('Error executing uploadFile:', error);
        res.status(500).json({ message: 'File upload failed', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


