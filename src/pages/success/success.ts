import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the SuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-success',
  templateUrl: 'success.html',
})
export class SuccessPage {
  builder: boolean;
  loaderAnimate: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuccessPage');
    setTimeout(() => {
      
      this.loaderAnimate = false
    }, 2000);
    console.log('ionViewDidLoad SuccessPage');
   this.builder = this.authService.manageUsers();
   console.log(this.builder, 'builder');
  }
  complete() {
    this.navCtrl.setRoot(HomePage);
  }
}
