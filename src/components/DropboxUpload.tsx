import { Dropbox } from 'dropbox';

const dbx = new Dropbox({ accessToken: import.meta.env.VITE_DROPBOX_ACCESS_TOKEN });

const DropboxUpload = (file: File) => {
  // dbx.usersGetCurrentAccount()
  // .then(function(response) {
  //   console.log(response);
  // })
  // .catch(function(error) {
  //   console.error(error);
  // });

  

  dbx.filesUpload({ path: `/your-folder-name/${file.name}`, contents: file }) //TODO: Change your-folder-name
    .then(response => {
      // console.log('File uploaded', response);
      console.log('File uploaded.');
    })
    .catch(error => {
      // console.error('Error uploading file:', error);
      console.error("Error uploading file.")
    });
};

export default DropboxUpload;