import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BuilderquotesPage } from '../builderquotes/builderquotes';

/**
 * Generated class for the BuilderMessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-builder-messages',
  templateUrl: 'builder-messages.html',
})
export class BuilderMessagesPage {
  drop: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuilderMessagesPage');
  }

  sendPdf() {
    this.navCtrl.push(BuilderquotesPage)
  }
  dropDown() {
    if(this.drop == true) {
      this.drop = false;
    }else {
      this.drop = true;
    }
  }

}
