import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import config from './config';

// firebase initialize
firebase.initializeApp(config);

export const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Auto-login for default (o.w. SESSION)

export const database = firebase.database();
export const connectedRef = firebase.database().ref(".info/connected");
export default firebase;