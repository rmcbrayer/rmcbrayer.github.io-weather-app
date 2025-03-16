export const environment = {
  production: false,
  weatherApiUrl: 'https://api.openweathermap.org',
  weatherApiTarget: 'data/2.5',
  weatherApiKey: 'b88349370c17cca283e8c36457a1e290', //Key is in plain text since the API is already public
  // Firebase configuration
  firebaseConfig: {
    apiKey: "AIzaSyAzrib7YjwXXC4omPRCp6WhWM_fd6EqFSs", //Key in Firebase is just way to identify the project, not for authentication
    authDomain: "weather-app-33c81.firebaseapp.com",
    projectId: "weather-app-33c81",
    storageBucket: "weather-app-33c81.firebasestorage.app",
    messagingSenderId: "19432073963",
    appId: "1:19432073963:web:88063d0d0801775dde6cae",
    measurementId: "G-3E9WDWC7TC"
  }
};
