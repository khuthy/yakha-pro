import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';


@Injectable()
export class AuthServiceProvider {
 // private isLoggedIn = false;
 db = firebase.firestore(); 
 predefined: boolean;
 status: boolean;
 unreadMessages = []
 public userProfile: firebase.firestore.DocumentReference;
  user;
  constructor() {}

 /*  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }

  authenticated() : boolean {
    return this.isLoggedIn;
  } */

  manageUsers() {
    return this.predefined;
  }
  getBuilderStatus() {
   return this.status;
  }
 /*  authState() {
  const auth =  firebase.auth().onAuthStateChanged((user)=>{
      if (user.uid) {
        this.navCtrl.setRoot(HomePage)
      } else {
        this.navCtrl.setRoot(LoginPage)
      }
    })

    return auth;
  } */
 
  loginUser(email: string,password: string): Promise<firebase.auth.UserCredential> {
    
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  signupUser(email: string, password: string): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUserCredential: firebase.auth.UserCredential) => {
        this.setUser(newUserCredential.user.uid);
       
        firebase.firestore().collection('Users').doc(this.getUser()).set({builder: this.manageUsers(), status: this.getBuilderStatus(), uid: this.getUser(), isProfile: false});
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }
  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }
  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }
 setUser(val){
  this.user = val;
    console.log('User form Provider', this.user);
 }
 getUser(){
  return this.user;
 }
 unreadMess(param) {
   this.unreadMessages.push(param);
 }
 getUnreadMessages() {
   return this.unreadMessages.length
 }

}
