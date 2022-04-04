const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const express = require('express');
const bodyParser = require("body-parser");
const { file } = require('googleapis/build/src/apis/file');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const CLIENT_ID= '424859888376-hvknfsdtc9enfrf45ir85uelqm2flpih.apps.googleusercontent.com';
const CLIENT_SECRET= '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';
const REDIRECT_URI= 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN= '1//04nGStAg06cbhCgYIARAAGAQSNwF-L9IrhlAdhweaG1ZvOKivXJoNTMAiczNpB12aYgnmeSCDQ0nY1gD9qyHCfliJLJ3r2qFCa9w';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({refresh_token  : REFRESH_TOKEN})

const drive= google.drive({
    version: 'v3',
    auth: oauth2Client
})


async function uploadFile(file_name, mime_type){
    var dir= __dirname + "/temp_files";
    const filePath= path.join(dir, file_name);
    try{
        const response= await drive.files.create({
            requestBody: {
                name: file_name,
                MimeType: mime_type
            },
            media: {
                mimeType: mime_type,
                body: fs.createReadStream(filePath)
            }
        });
        return {'status': response.status, 'doc_id':response.data.id}
        // return data here 
    }
    catch(error){
    console.log(error.message)
    return {'status': error.status, 'error_message': error.message}
    }
}

async function generatePublicURL(document_id){
    try{
        await drive.permissions.create({
            fileId: document_id,
            requestBody: {
                role:'reader',
                type:'anyone'
            }
        })

        const result = await drive.files.get({
            fileId: document_id,
            fields: 'webViewLink, webContentLink'
        })
        console.log(result.data);
        return {'status': result.status, 'result': result.data.webContentLink}
        //return data here
    }
    catch (error){
        console.log(error.message)
        return {'status': error.status,'error_message': error.message}
    }
}

app.route('/get_document')
.get((req, res, next) => {
    doc_id= req.body.doc_id
    var x= generatePublicURL(doc_id)
    setTimeout(() =>{
        x.then(function(result){
            res.send(result)
        })
    },4000);
})

app.route('/insert_document')
.post((req, res, next) => {
    // res.send('POST request called');
    file_name= req.body.file_name
    mime_type= req.body.mime_type
    var x= uploadFile(file_name, mime_type)
    setTimeout(() => {
        console.log('promise', x); 
        x.then(function(result){
            console.log("result", result)
            res.send(result)
        })
    
    },4000);
    
})

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

