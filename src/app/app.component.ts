import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import * as firebase from "firebase/app";

import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LoginPage } from '../pages/login/login';
import { WelcomePage } from '../pages/welcome/welcome';
import { AccountSetupPage } from '../pages/account-setup/account-setup';
import { BaccountSetupPage } from '../pages/baccount-setup/baccount-setup';
import { VersionPage } from '../pages/version/version';
import { HelpPage } from '../pages/help/help';
import { ChannelsPage } from '../pages/channels/channels';
import { firebaseConfig } from './app.firebase.config';
import { TipsPage } from '../pages/tips/tips';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  db: any;
  predefined: string;
  pages: Array<{ title: string, component: any, icon: string }>;
  signal_app_id: string = 'd5fca77d-17c0-46af-a473-071a32f00063';
  firebase_id: string = '27383344134';
  userLoggedinNow = {
    fullname: '',
    email: '',
    image: '',
    builder: false,
  }

  version = 'v1.0.0';
  messages = 0
  token: string;

  constructor(
    public platform: Platform,
    private screenOrientation: ScreenOrientation,
    public splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal
  ) {
    // set status bar to white

    this.initializeApp();
    firebase.initializeApp(firebaseConfig);

    oneSignal.startInit(this.signal_app_id, this.firebase_id);
    // oneSignal.getIds().then((userID) => {
    //   console.log(userID.userId);

    // })
    oneSignal.inFocusDisplaying(oneSignal.OSInFocusDisplayOption.InAppAlert);
    oneSignal.handleNotificationReceived().subscribe((res) => {

    })
    oneSignal.handleNotificationOpened().subscribe((res) => {

    })
    oneSignal.endInit();



  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#203959');
      if (this.platform.is('cordova')) {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      } else {
        console.log('cannot perform portrait');
      }

      this.userAuthentication();
      this.splashScreen.hide();

    });
  }
  // exit() {
  //   let alert = this.alert.create({
  //     title: 'Confirm',
  //     message: 'Do you want to exit?',
  //     buttons: [{
  //       text: "Exit",
  //       handler: () => { this.exitApp() }
  //     }, {
  //       text: "Cancel",
  //       role: 'cancel'
  //     }]
  //   })
  //   alert.present();
  // }
  // exitApp() {
  //   this.platform.exitApp();
  // }
  setupPush() {

    this.oneSignal.startInit(this.signal_app_id, this.firebase_id);
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    this.oneSignal.handleNotificationReceived().subscribe((res) => {
    })
    this.oneSignal.handleNotificationOpened().subscribe((res) => {

    })
    this.oneSignal.getIds().then((token) => {
      this.token = token.userId;
    })
    this.oneSignal.endInit();
  }

  openPage(page) {
    this.nav.push(page.component);
  }
  /* viewProfile() {
    this.nav.push(AccountSetupPage);
  }
  viewProfileB() {
   this.nav.push(BaccountSetupPage);
  } */
  userAuthentication() {



    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('My uid', user.uid);
        if (this.platform.is('cordova')) {
          this.setupPush()
        } else {
          console.log('you are running on a browser');

        }
        firebase.firestore().collection('Users').doc(user.uid).onSnapshot((profile) => {
          if (profile.exists) {
            if(this.platform.is('cordova')) {
              firebase.firestore().collection('Users').doc(user.uid).update({ tokenID: this.token })
            }
             
            firebase.firestore().collection('Request').where('hOwnerUid', '==', firebase.auth().currentUser.uid).onSnapshot((request) => {
              if (!request.empty) {
                request.forEach(list => {
                  firebase.firestore().collection('Respond').doc(list.id).onSnapshot(res => {
                    if (res.exists) {
                      if (res.data().viewed == false) {
                        this.messages = res.data.length;
                      }

                    }
                  })
                });
              }
            })
             if(this.platform.is('cordova')) {
              firebase.firestore().collection('Users').doc(user.uid).update({ tokenID: this.token })
             }
            if (profile.data().isProfile == true && profile.data().status == true) {
              if (profile.data().builder == true) {
                this.rootPage = HomePage;
                this.userLoggedinNow.image = profile.data().image
                this.userLoggedinNow.fullname = profile.data().fullName
                this.userLoggedinNow.email = user.email;
                this.userLoggedinNow.builder = profile.data().builder;
                this.pages = [
                  { title: 'View Profile', component: BaccountSetupPage, icon: 'ios-person' },
                  { title: 'Tips', component: TipsPage, icon: 'information-circle' },
                  { title: 'Help', component: HelpPage, icon: 'help' }

                ];
              } else {
                this.rootPage = HomePage;
                this.pages = [
                  { title: 'View Profile', component: AccountSetupPage, icon: 'ios-person' },
                  { title: 'Messages', component: ChannelsPage, icon: 'chatbubbles' },
                  { title: 'Tips', component: TipsPage, icon: 'information-circle' },
                  { title: 'Help', component: HelpPage, icon: 'help' }
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
      } else {
        console.log('Logged out');
        this.rootPage = WelcomePage;
      }

    });
  }
}
