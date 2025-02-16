import { Dropbox } from 'dropbox';

const dbx = new Dropbox({ accessToken: import.meta.env.VITE_DROPBOX_ACCESS_TOKEN });
const APP_KEY = import.meta.env.VITE_DROPBOX_APP_KEY;
const APP_SECRET = import.meta.env.VITE_DROPBOX_APP_SECRET;

async function updateFile(fileName: string, rsvp: JSON) {
  try {
    const response = await dbx.filesDownload({ path: `/your-folder-name/${fileName}`});
    
    console.log(response);
    console.log(response.result);

    if (response.result.fileBlob) {
      const fileBlob = response.result.fileBlob;
      const fileContent = await fileBlob.text();
      console.log(fileContent);
      let jsonData = JSON.parse(fileContent);
      console.log(jsonData);

      jsonData = {...jsonData, ...rsvp}
      const updatedContent = JSON.stringify(jsonData, null, 2);

      console.log("xxxxxxxxxxxxxxxxxxxxxx");
      console.log(updatedContent);

      await dbx.filesUpload({
        path: `/your-folder-name/${fileName}`,  // Keep the same file path or change it if needed
        contents: updatedContent,  // New file content
        mode: { ".tag": "overwrite" },  // Overwrite the existing file
      });

      console.log("yyyyyyyy");
      // You can use the URL to display or download the file
    }

  } catch (error) {
    console.log(error);
  }
}

// function refreshAccessToken() {
//   const refreshToken = localStorage.getItem('refresh_token');
//   const tokenUrl = 'https://api.dropboxapi.com/oauth2/token';
//   const data = new URLSearchParams();

//   // Ensure refreshToken is not null
//   if (refreshToken === null) {
//     console.error('No refresh token found');
//     return;
//   }

//   data.append('client_id', APP_KEY);
//   data.append('client_secret', APP_SECRET);
//   data.append('grant_type', 'refresh_token');
//   data.append('refresh_token', refreshToken);

//   fetch(tokenUrl, {
//     method: 'POST',
//     body: data
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log('New Access Token:', data.access_token);
//     // Store the new access token for future use
//     localStorage.setItem('access_token', data.access_token);
//   })
//   .catch(error => console.error('Error refreshing token:', error));
// }

const DropboxUpload = (file: File) => {
  dbx.usersGetCurrentAccount()
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.error(error);
  });

  // dbx.filesUpload({ path: `/your-folder-name/${file.name}`, contents: file }) //TODO: Change your-folder-name
  //   .then(response => {
  //     console.log('File uploaded', response);
  //   })
  //   .catch(error => {
  //     console.error('Error uploading file:', error);
  //   });

  updateFile("responses.txt", { 'test' : 'test' });
};

export default DropboxUpload;