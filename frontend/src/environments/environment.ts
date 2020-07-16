// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export interface IEnvironment {
  production: boolean;
  firebase: Object;
}

export const environment: IEnvironment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCthdyLDsGgDUq6UNNT8BKXhTS8Y6x47vA",
    authDomain: "gandalf-platform.firebaseapp.com",
    databaseURL: "https://gandalf-platform.firebaseio.com",
    projectId: "gandalf-platform",
    storageBucket: "gandalf-platform.appspot.com",
    messagingSenderId: "705358200783",
    appId: "1:705358200783:web:a4464b2b252a3746475cba",
    measurementId: "G-HBFZMDDF7F"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
