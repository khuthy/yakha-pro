import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  builder: boolean;
  userLoggingIn: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    console.log('ionViewDidLoad LoginPage', this.authService.manageUsers());
    if(this.authService.manageUsers()) {

      this.builder = true;
      this.userLoggingIn = "Home Builder";
    }else {
      this.builder = false;
      this.userLoggingIn = "Home Owner";

    }
  }

  gotoLogin(){
    this.navCtrl.push(LoginPage)
  }

}
