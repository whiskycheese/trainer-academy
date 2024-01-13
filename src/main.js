import Vue from 'vue';

import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

import router from './router';
import './index.css';
import App from './App.vue';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyDdpN7Nbgs8fkt-6CM20YI9_MfbE6vlfLM',
  authDomain: 'trainer-c1600.firebaseapp.com',
  projectId: 'trainer-c1600',
  storageBucket: 'trainer-c1600.appspot.com',
  messagingSenderId: '142234983687',
  appId: '1:142234983687:web:fa7b3acfdb4790857679a2',
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
