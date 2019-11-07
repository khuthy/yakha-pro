
import { OnboardingBuilderPage } from './../pages/onboarding-builder/onboarding-builder';

import { HttpClient } from '@angular/common/http';

 import { Downloader } from '@ionic-native/downloader';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { BuilderProfileviewPage } from './../pages/builder-profileview/builder-profileview';

 import { HelpPage } from './../pages/help/help';

 import { OnboardingPage } from './../pages/onboarding/onboarding';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Camera } from '@ionic-native/camera';
import { QuotationFormPage } from '../pages/quotation-form/quotation-form';
import { SuccessPage } from '../pages/success/success';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StatusBar } from '@ionic-native/status-bar';

import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { IonicStorageModule } from '@ionic/storage';

import { BuilderquotesPage } from '../pages/builderquotes/builderquotes';
import { FileOpener } from '@ionic-native/file-opener';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CallNumber } from '@ionic-native/call-number';
import { ProfileComponent } from '../components/profile/profile';
import { DescriptionComponent } from '../components/description/description';
import { AccountSetupPage } from '../pages/account-setup/account-setup';
import { RegisterPage } from '../pages/register/register';
import { WelcomePage } from '../pages/welcome/welcome';

import { File } from '@ionic-native/file';
import { BaccountSetupPage } from '../pages/baccount-setup/baccount-setup';
import { VersionPage } from '../pages/version/version';

import { ChannelsPage } from '../pages/channels/channels';
import { TipsPage } from '../pages/tips/tips';
import { MessagesPage } from '../pages/messages/messages';
import { BuilderMessagesPage } from '../pages/builder-messages/builder-messages';
import { OneSignal } from '@ionic-native/onesignal';
import { Device } from '@ionic-native/device';
import { AndroidPermissions } from '@ionic-native/android-permissions';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    WelcomePage,
    QuotationFormPage,
    BuilderProfileviewPage,
    AccountSetupPage,
    RegisterPage,
    OnboardingPage,
    OnboardingBuilderPage,
    SuccessPage,
    BaccountSetupPage,
    HelpPage,
    ChannelsPage,
    VersionPage,
    TipsPage,
    MessagesPage,
    DescriptionComponent,
    BuilderquotesPage,
    BuilderMessagesPage

  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp, {
      pageTransition: 'ios-transition',
    }),
    IonicStorageModule.forRoot(),
    GooglePlaceModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    WelcomePage,
    QuotationFormPage,
    BuilderProfileviewPage,
    AccountSetupPage,
    RegisterPage,
    OnboardingPage,
    OnboardingBuilderPage,
    SuccessPage,
    BaccountSetupPage,
    HelpPage,
    VersionPage,
    ChannelsPage,
    TipsPage,
    MessagesPage,
    DescriptionComponent,
    BuilderquotesPage,
    BuilderMessagesPage
    
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
    FileOpener,
    CallNumber,
    GooglePlaceModule,
    Downloader,
    OneSignal,
    Device,
    AndroidPermissions,
    

  ]
})
export class AppModule {}
