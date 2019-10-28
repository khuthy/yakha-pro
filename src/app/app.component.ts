import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import * as firebase from "firebase/app";

import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LoginPage } from '../pages/login/login';
import { WelcomePage } from '../pages/welcome/welcome';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WelcomePage;
  db: any;
  predefined: string;
  pages: Array<{ title: string, icon: string }>;
  /*  signal_app_id: string = 'e144f8b8-2305-4546-85dc-9b565d716dd2';
   firebase_id: string = '587617081134'; */
  userLoggedinNow = {
    fullname: '',
    email: '',
    image: '',
    builder: false,
  }

  version = 'v1.0.0';
  messages = 0
  token: string;

  constructor(public platform: Platform, 
    private screenOrientation: ScreenOrientation, 
    public splashScreen: SplashScreen, private statusBar: StatusBar,
    public alert: AlertController) {

    
    // set status bar to white

   

    
    this.initializeApp();
    
  
   
    
    // oneSignal.startInit(this.signal_app_id, this.firebase_id);
    // // oneSignal.getIds().then((userID) => {
    // //   console.log(userID.userId);

    // // })
    //    oneSignal.inFocusDisplaying(oneSignal.OSInFocusDisplayOption.InAppAlert);
    //   oneSignal.handleNotificationReceived().subscribe((res) => {

    //   })
    //   oneSignal.handleNotificationOpened().subscribe((res) => {

    //   })
    //   oneSignal.endInit();

   

  }

  initializeApp() {
    
    this.platform.ready().then(() => {
      
      if(this.platform.is('cordova')) {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      }else {
        console.log('cannot perform portrait');
        
      }
      this.statusBar.backgroundColorByHexString('#203550');
      this.statusBar.overlaysWebView(false);
      this.userAuthentication(); 
      this.splashScreen.hide();
      
    });
  }
  exit() {
    let alert = this.alert.create({
      title: 'Confirm',
      message: 'Do you want to exit?',
      buttons: [{
        text: "Exit",
        handler: () => { this.exitApp() }
      }, {
        text: "Cancel",
        role: 'cancel'
      }]
    })
    alert.present();
  }
  exitApp() {
    this.platform.exitApp();
  }
  /*   setupPush(){
      
        this.oneSignal.startInit(this.signal_app_id, this.firebase_id);
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
        this.oneSignal.handleNotificationReceived().subscribe((res) => {
      })
        this.oneSignal.handleNotificationOpened().subscribe((res) => {
        
        })
        this.oneSignal.getIds().then((token)=>{
          this.token = token.userId;
        })
        this.oneSignal.endInit();
    } */

  openPage(page) {
    this.nav.push(page.component);
  }
  /* viewProfile() {
    this.nav.push(AccountSetupPage);
  }
  viewProfileB() {
   this.nav.push(BaccountSetupPage);
  } */
  userAuthentication(){
 
    if (this.platform.is('cordova')) {
      //  this.setupPush()
    }
   
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
         
          firebase.firestore().collection('Users').doc(user.uid).onSnapshot((profile) => {
        if (profile.exists) {
          // firebase.firestore().collection('Users').doc(user.uid).update({tokenID: this.token})
          /*        firebase.firestore().collection('Request').where('hOwnerUid', '==', firebase.auth().currentUser.uid).onSnapshot((request)=>{
                   if(!request.empty) {
                     request.forEach(list => {
                       firebase.firestore().collection('Respond').doc(list.id).onSnapshot(res => {
                         if(res.exists) {
                           if(res.data().viewed == false) {
                             this.messages = res.data.length;
                           }
                          
                         }
                         })
                     });
                   }
                 }) */
          //   firebase.firestore().collection('Users').doc(user.uid).update({tokenID: this.token})
          if (profile.data().isProfile == true && profile.data().status == true) {
            if (profile.data().builder == true) {
              this.rootPage = HomePage;
              this.userLoggedinNow.image = profile.data().image
              this.userLoggedinNow.fullname = profile.data().fullName
              this.userLoggedinNow.email = user.email;
              this.userLoggedinNow.builder = profile.data().builder;
              this.pages = [
                { title: 'View Profile', icon: 'ios-person' },
                { title: 'Tips', icon: 'information-circle' },
                { title: 'Version', icon: 'help' }

              ];
            } else {
              this.rootPage = HomePage;
              this.pages = [
                { title: 'View Profile',   icon: 'ios-person' },
                { title: 'Messages', icon: 'chatbubbles' },
                { title: 'Tips', icon: 'information-circle' },
                { title: 'Help', icon: 'help' }
              ];
              this.userLoggedinNow.image = profile.data().image
              this.userLoggedinNow.fullname = profile.data().fullName
              this.userLoggedinNow.email = user.email;
              this.userLoggedinNow.builder = false;
            }

          } else {
            if (profile.data().builder == true) {
              /// this.rootPage = BaccountSetupPage;
            } else {
              //  this.rootPage = AccountSetupPage;
            }

          }
        }
      })
      }else {
        console.log('Logged out');
        this.rootPage = WelcomePage;
      }
    
    });
  }
}
