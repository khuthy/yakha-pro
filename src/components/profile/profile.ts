import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class ProfileComponent {

  text: string;

  constructor(private navCtrl: NavController, private navParam: NavParams, private viewCtrl: ViewController) {
    console.log('Hello ProfileComponent Component');
    this.text = this.navParam.get('image');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  
    }

}
