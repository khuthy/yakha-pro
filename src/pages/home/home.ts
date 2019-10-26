import { RegisterPage } from './../register/register';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }


  //METHOD THAT TAKES LOGIN BUTTON TO LOGIN PAGE
  loginpage(){
    this.navCtrl.push(LoginPage);
  }

  //METHOD THAT TAKES LOGIN BUTTON TO LOGIN PAGE
  registerpage(){
    this.navCtrl.push(RegisterPage);
  }
}
