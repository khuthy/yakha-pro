import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  builder: boolean;
  userLoggingIn: string;

  input = document.getElementsByClassName('input');
  renderer: any;
  menuShow: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider) {
  }


//allowing the keyboard to sit on top of buttons and pattern
  checkKeyboard(data) {
    if (data == 'open') {
      //this.hid='value';
      this.renderer.setStyle(this.input[0], 'transform', 'translateY(40vh)');
      this.menuShow = false;

    } else {
      this.renderer.setStyle(this.input[0], 'transform', 'translateY(0)');
      this.menuShow = true
    }
    // console.log(data);

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage', this.authService.manageUsers());
    if(this.authService.manageUsers()) {

      this.builder = true;
      this.userLoggingIn = "Home Builder";
    }else {
      this.builder = false;
      this.userLoggingIn = "Home Owner";

    }
  }

/*   ionViewCanEnter(){
   return this.authService.authenticated();
  } */
  gotoRegister() {
    this.navCtrl.push(RegisterPage);
  }
}
