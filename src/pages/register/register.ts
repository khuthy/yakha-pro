import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Keyboard } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaccountSetupPage } from '../baccount-setup/baccount-setup';
import { AccountSetupPage } from '../account-setup/account-setup';

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
  signupForm: FormGroup;
   public loading: any;
  hideElement: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthServiceProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private keyboard: Keyboard
    ) {
   this.signupForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])
      ]
    })
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

  checkKeyBoardEvents() {
    if(this.keyboard.isOpen()) {
      this.hideElement = true;
    }else {
      this.hideElement = false;
    }
  }
  goLogin() {
    this.navCtrl.push(LoginPage);
  }
  async signupUser(signupForm: FormGroup): Promise<void> {

    if (!signupForm.valid) {
      console.log(
        'Need to complete the form, current value: ',
        signupForm.value
      );
    } else {

      const email: string = signupForm.value.email;
      const password: string = signupForm.value.password;

      this.authService.signupUser(email, password).then(
        (user) => {
         
          this.loading.dismiss().then(() => {
            console.log('user is registered: ', user);
            if (this.authService.manageUsers() == true) {
              this.navCtrl.setRoot(BaccountSetupPage)
             } else {
              this.navCtrl.setRoot(AccountSetupPage)
            }
          });




        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
            await alert.present();
          });
        }
      );
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
    }
  }

}
