// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiurl: "https://simplifyapi.azurewebsites.net/api/",
  firebaseConfig: {
    apiKey: "AIzaSyADgsBEOvH5ki87_CK3QOFSnASmqvubl5A",
    authDomain: "simplify-4e093.firebaseapp.com",
    databaseURL: "https://simplify-4e093.firebaseio.com",
    projectId: "simplify-4e093",
    storageBucket: "simplify-4e093.appspot.com",
    messagingSenderId: "323461699965",
    appId: "1:323461699965:web:303b31b3563ad3c611d414"
  }
};
