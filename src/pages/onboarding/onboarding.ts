import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { LoginPage } from '../login/login';

/**
 * Generated class for the OnboardingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }
  getStarted(){
    // set a key/value
    this.storage.set('homeOwner', true);
    this.navCtrl.setRoot(LoginPage);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnboardingPage');
  }

}
