import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides, MenuController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { LoginPage } from '../login/login';
import { WelcomePage } from '../welcome/welcome';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


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
  @ViewChild('slides') slides: Slides;

  slide = [
    {
      title: "Welcome to the Yakha",
      description: "Create an account and setup your profile to start using this application,",
      image: "../../assets/imgs/login.svg",
    },
    {
      title: "Find Builders at your Location",
      description: "Enable your location search for all the available builders around your area.",
      image: "../../assets/imgs/maps.svg",
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage, private menuCtrl: MenuController) {
    this.storage.get('homeOwner').then(val => {
      if(val == true)  {
        console.log(val);
        this.navCtrl.setRoot(LoginPage);
        
      }else {
        console.log('on-boarding now');
        
      }
      
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnboardingPage');
  }
  ionViewWillEnter(){
    this.menuCtrl.swipeEnable(false);
  }
  ionViewWillLeave(){
    this.menuCtrl.swipeEnable(false);
  }

  /* navigate page  */
  
  nextslides(){
    this.slides.slideNext();
  }

  getStarted(){
  // set a key/value
  this.storage.set('homeOwner', true);
  this.navCtrl.setRoot(LoginPage,this.navParams.data);
  }
  // Or to get a key/value pair
 skip(){
  this.storage.set('homeOwner', true);
  this.navCtrl.setRoot(LoginPage,this.navParams.data);
 }

}
