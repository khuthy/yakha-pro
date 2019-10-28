import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import {Storage} from '@ionic/storage';
import { LoginPage } from '../login/login';
/**
 * Generated class for the OnboardingBuilderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-onboarding-builder',
  templateUrl: 'onboarding-builder.html',
})
export class OnboardingBuilderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnboardingBuilderPage');
  }

  getStarted(){
    // set a key/value
    // this.storage.set('onboarding', true);
    this.navCtrl.setRoot(LoginPage);
    }

}
