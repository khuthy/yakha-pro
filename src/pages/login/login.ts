import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Keyboard, LoadingController } from 'ionic-angular';
//import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { RegisterPage } from '../register/register';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { HomePage } from '../home/home';
import { AccountSetupPage } from '../account-setup/account-setup';
import { BaccountSetupPage } from '../baccount-setup/baccount-setup';
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
  public loginForm: FormGroup;
  loaderAnimate: boolean;
  db = firebase.firestore().collection('Users');
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email address is required.' },
      { type: 'pattern', message: 'Email address is not Valid.' },

    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'password must be atleast 6 char or more.' },
      /*  {type: 'maxlength', message: 'Password must be less than 8 char or less'}, */
    ]

  }
  hideElement: boolean;
  messages: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthServiceProvider, private formBuilder: FormBuilder,
    public alertCtrl: AlertController, private keyboard: Keyboard,public loadingCtrl: LoadingController) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)]))

    })
  }


//allowing the keyboard to sit on top of buttons and pattern
/*   checkKeyboard(data) {
    if (data == 'open') {
      //this.hid='value';
      this.renderer.setStyle(this.input[0], 'transform', 'translateY(40vh)');
      this.menuShow = false;

    } else {
      this.renderer.setStyle(this.input[0], 'transform', 'translateY(0)');
      this.menuShow = true
    }
    // console.log(data);

  } */
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
/*   ionViewWillLeave(){
   this.authService.authState();
  } */

  checkKeyBoardEvents() {
    if(this.keyboard.isOpen()) {
      this.hideElement = true;
    }else {
      this.hideElement = false;
    }
  }
  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
  }
  loginUser() {
//     setTimeout(()=>{
// this.presentLoading()
//     },1000)
    
    if (!this.loginForm.valid) {
      this.alertCtrl.create({
        title: 'Incorrect entry!',
        subTitle: 'Please make sure your info is correct..',
        buttons: ['Ok']
      }).present();
    } else {
      this.loaderAnimate = true;
     
      let signIn = this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password);
   
      signIn.then((getUid) => {
        this.authService.setUser(getUid.user.uid);
        this.db.doc(this.authService.getUser()).onSnapshot((profile) => {
          if (!profile.data().isProfile) {
            this.loaderAnimate = true
            if (profile.data().builder == true) {
              this.navCtrl.setRoot(BaccountSetupPage);
             // loading.dismiss();
             setTimeout(()=> {
               this.loaderAnimate = false;
             }, 1000);
            } else {
              this.navCtrl.setRoot(AccountSetupPage);
              //loading.dismiss();
            }
          } else {
            this.navCtrl.setRoot(HomePage);
            //loading.dismiss();
          }
        })
      }).catch(() => {
       this.messages = "User does not exists";
    });
    setTimeout(() => {
      this.loaderAnimate = false;
    }, 2000);
  }
 }
}
