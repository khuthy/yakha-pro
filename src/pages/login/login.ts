import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

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
    console.log('ionViewDidLoad LoginPage');
  }

/*   ionViewCanEnter(){
   return this.authService.authenticated();
  } */

}
