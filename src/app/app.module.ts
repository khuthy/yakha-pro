// import { TestPage } from './../pages/test/test';
import { OnboardingBuilderPage } from './../pages/onboarding-builder/onboarding-builder';
import { Keyboard } from '@ionic-native/keyboard';
/* import { GoogleMapsComponent } from './../components/google-maps/google-maps'; */
import { HttpClient } from '@angular/common/http';
// import { PlacePage } from './../pages/place/place';
//import { AddBricklayerPage } from './../pages/add-bricklayer/add-bricklayer';

// import { BaccountSetupPage } from './../pages/baccount-setup/baccount-setup';
// import { Downloader } from '@ionic-native/downloader';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { BuilderProfileviewPage } from './../pages/builder-profileview/builder-profileview';
// import { ForgotPasswordPage } from './../pages/forgot-password/forgot-password';
// import { VersionPage } from './../pages/version/version';

// import { FeedbackPage } from './../pages/feedback/feedback';
// import { HelpPage } from './../pages/help/help';
// import { MessagesPage } from './../pages/messages/messages';

// import { AccountSetupPage} from './../pages/account-setup/account-setup';
 import { OnboardingPage } from './../pages/onboarding/onboarding';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';




import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
//import { RegisterPage } from '../pages/register/register';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Camera } from '@ionic-native/camera';
//import { SignoutPage } from '../pages/signout/signout';

import { QuotationFormPage } from '../pages/quotation-form/quotation-form';
import { SuccessPage } from '../pages/success/success';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule, /* other http imports */ } from "@angular/common/http";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
//import { WelcomePage } from '../pages/welcome/welcome';
//import { BricklayerlandingPage } from '../pages/bricklayerlanding/bricklayerlanding';
//import { ViewmessagePage } from '../pages/viewmessage/viewmessage';
import { IonicStorageModule } from '@ionic/storage';

//import { BuilderquotesPage } from '../pages/builderquotes/builderquotes';

//import { File } from '@ionic-native/file';

//import { FileOpener } from '@ionic-native/file-opener';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CallNumber } from '@ionic-native/call-number';
import { ProfileComponent } from '../components/profile/profile';
///import { LocalNotifications } from '@ionic-native/local-notifications';
//import { FileTransfer } from '@ionic-native/file-transfer';
//import { DocumentViewer } from '@ionic-native/document-viewer';
//import { StarRatingModule } from 'ionic3-star-rating';
//import { PopoverPage } from '../pages/popover/popover';
import { DescriptionComponent } from '../components/description/description';
import { AccountSetupPage } from '../pages/account-setup/account-setup';
import { RegisterPage } from '../pages/register/register';
import { WelcomePage } from '../pages/welcome/welcome';
import { firebaseConfig } from './app.firebase.config';
import * as firebase from 'firebase';
import { BaccountSetupPage } from '../pages/baccount-setup/baccount-setup';
//import { OneSignal } from '@ionic-native/onesignal';
//import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
//import { SMS } from '@ionic-native/sms';
//import { ChannelsPage } from '../pages/channels/channels';
//import { PasswordResetComponent } from '../components/password-reset/password-reset';
firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    WelcomePage,
    QuotationFormPage,
    BuilderProfileviewPage,
    AccountSetupPage,
    RegisterPage,
    OnboardingPage,
    OnboardingBuilderPage,
    SuccessPage,
    BaccountSetupPage

  
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    WelcomePage,
    QuotationFormPage,
    BuilderProfileviewPage,
    AccountSetupPage,
    RegisterPage,
    OnboardingPage,
    OnboardingBuilderPage,
    SuccessPage,
    BaccountSetupPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    ScreenOrientation,
    Geolocation,
    Camera,
    File,
    CallNumber,
    Keyboard,

  ]
})
export class AppModule {}
