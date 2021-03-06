import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController, MenuController, PopoverController, ActionSheetController, Platform, Keyboard } from 'ionic-angular';
import * as firebase from "firebase/app";
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera';
import { CallNumber } from '@ionic-native/call-number';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ProfileComponent } from '../../components/profile/profile';
//import { OneSignal } from '@ionic-native/onesignal';
import { LoginPage } from '../login/login';
import { text } from '@angular/core/src/render3/instructions';
import { File, FileEntry } from '@ionic-native/file';
import { OneSignal } from '@ionic-native/onesignal';
import { HomePage } from '../home/home';


/**
 * Generated class for the AccountSetupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-setup',
  templateUrl: 'account-setup.html',
})
export class AccountSetupPage {
  isProfile = false;
  db = firebase.firestore().collection('Users');
  storage = firebase.storage().ref();
  uid
  profileImage;
  imageSelected = false;
  isuploaded = false;
  profileForm: FormGroup;
  uploadprogress = 0;
  isuploading: false
  displayProfile = [];
  icon: string;
  HomeOwnerProfile = {
    uid: '',
    image: '',
    isProfile: true,
    fullName: '',
    gender: '',
    personalNumber: '',
    About: '',
    date: Date(),
    ownerAddress: '',
    tokenID: '',


  }


  options = {
    componentRestrictions: {
      country: ['ZA']
    }
  }
  loaderAnimate = true;
  back: boolean;
  hid: string = '';
  hideElement: boolean;
  loaderMessages: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private authUser: AuthServiceProvider,
    public camera: Camera,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private menuCtrl: MenuController,
    private callNumber: CallNumber,
    public popoverCtrl: PopoverController,
     public oneSignal: OneSignal,
    public actionSheetCtrl: ActionSheetController,
    public file: File,
    private keyboard: Keyboard,
    public plt: Platform
    // public readFile : FileReader
  ) {
    this.uid = firebase.auth().currentUser.uid;
    this.authUser.setUser(this.uid);
    this.HomeOwnerProfile.uid = this.uid;
    this.profileForm = this.formBuilder.group({
      fullName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)])),
      gender: new FormControl('', Validators.compose([Validators.required])),
      personalNumber: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
      About: [''],
      address: new FormControl('', Validators.compose([Validators.required]))
    });
      oneSignal.getIds().then((res) => {
       this.HomeOwnerProfile.tokenID = res.userId;
     }); 
    this.backButton()

  }
  public handleAddressChange(addr: Address) {
    this.HomeOwnerProfile.ownerAddress = addr.formatted_address;
  }
  ionViewWillEnter() {
    this.menuCtrl.swipeEnable(false);
    firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).onSnapshot((res) => {
     this.back = res.data().isProfile; 
    })

  }
  ionViewDidLoad() {

   
    setTimeout(() => {
      this.loaderAnimate = false;
    }, 2000)
    console.log(this.uid)
    console.log(this.authUser.getUser());
    console.log(this.navParams.data);
   


    this.getProfile();
  }

  checkKeyBoardEvents() {
    if (this.keyboard.isOpen()) {
      this.hideElement = true;
    } else {
      this.hideElement = false;
    }
  }

  ionViewWillLeave() {
    this.menuCtrl.swipeEnable(false);
  }
  //select image for the salon
  async selectImage() {
    const actionSheet = await this.actionSheetCtrl.create({
      title: "Select image",
      cssClass: "class_used_to_set_icon",
      buttons: [{
        icon: 'images',
        text: 'Gallery',

        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY)
        }
      },
      {
        icon: 'camera',
        text: 'Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA)
        }
      },
      {
        icon: 'close',
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  async createprofile(profileForm: FormGroup) {
    if(profileForm.valid) {
      this.loaderAnimate = true;
      if(this.back == true) {
        await this.db.doc(this.uid).update(this.HomeOwnerProfile).then((res) => {
          this.isProfile = true;
         // this.navCtrl.pop();
        })
      }else {
        await this.db.doc(this.uid).update(this.HomeOwnerProfile).then((res) => {
         this.navCtrl.setRoot(HomePage);
         // this.navCtrl.pop();
        })
      }
     
       setTimeout(() => {


         this.loaderAnimate = false;
       }, 2000)
    }else {
      console.log('please enter all inputs');
      
    }
  
  }
  async takePicture(sourcetype: PictureSourceType) {
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      quality: 90,
      targetHeight: 600,
      targetWidth: 600,
      sourceType: sourcetype,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    await this.camera.getPicture(options).then(res => {
      let base64Image = 'data:image/jpeg;base64,' + res;
      this.profileImage = base64Image;
      let file = 'HomeOwner-Profile/' + this.authUser.getUser() + '.jpg';
      const UserImage = this.storage.child(file);
      const upload = UserImage.putString(base64Image, 'data_url');
      upload.on('state_changed', snapshot => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.uploadprogress = progress;
        console.log('Uploading image..', progress);
        this.loaderAnimate = true;
        this.loaderMessages = 'Uploading Image...';
        if (progress == 100) {
          this.isuploading = false;
        }
      }, err => {
      }, () => {
        upload.snapshot.ref.getDownloadURL().then(downUrl => {
          this.HomeOwnerProfile.image = downUrl;
         // console.log('Image downUrl.............', this.HomeOwnerProfile.image);
         setTimeout(() => {
          this.loaderAnimate = false;
        }, 1000);
          this.isuploaded = true;
        })
      })
    }, err => {
      console.log("Something went wrong: ", err);
    })
    this.imageSelected = true;
    // })
  }
  backButton() {
    this.plt.registerBackButtonAction(() => {
      if (this.back == true) {
        this.isProfile = true;
      }
    })
  }


  validation_messages = {
    'fullName': [
      { type: 'required', message: 'Name is required.' },
      { type: 'minlength', message: 'Name must be at least 4 characters long.' },
      { type: 'maxlength', message: 'Name cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your Name must not contain numbers and special characters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'gender': [
      { type: 'required', message: 'Gender is required.' }
    ],

    'personalNumber': [
      { type: 'required', message: 'Cellnumber is required.' }
    ],
    'address': [{ type: 'required', message: 'Address is required.' }]
  };
  getProfile() {

    // create a reference to the collection of HomeOwnerProfile...


    // ...query the profile that contains the uid of the currently logged in user...
    let query = this.db.doc(this.authUser.getUser());
    query.onSnapshot(doc => {
      // ...log the results of the document exists...
      if (doc.exists) {
        if (doc.data().isProfile == true) {
          console.log('Got data', doc.data());
          this.displayProfile = [];
          console.log('Profile Document: ', doc.data(), doc.data())
          this.displayProfile.push(doc.data());
          this.HomeOwnerProfile.About = doc.data().About;
          this.HomeOwnerProfile.image = doc.data().image;
          this.profileImage = doc.data().image;
          this.HomeOwnerProfile.fullName = doc.data().fullName;
          this.HomeOwnerProfile.gender = doc.data().gender;
          this.HomeOwnerProfile.personalNumber = doc.data().personalNumber;
          this.HomeOwnerProfile.ownerAddress = doc.data().ownerAddress
          this.profileForm.patchValue({ address: doc.data().ownerAddress })

          this.icon = 'create';
          this.isProfile = true;
        } else {
          this.isProfile = false;
          this.icon = 'image';
        }

      } else {
        console.log('No data');
        this.isProfile = false;
        this.icon = 'image';
      }
      // dismiss the loading

    })
  }
  editProfile() {
    this.isProfile = false;
    this.icon = 'create';
  }
  cancelProfile() {
    this.isProfile = true;
    this.icon = 'create';
  }

  callJoint(phoneNumber) {
    this.callNumber.callNumber(phoneNumber, true);
  }
  viewProfile(myEvent) {
    let popover = this.popoverCtrl.create(ProfileComponent, { image: myEvent });
    popover.present({
      ev: myEvent
    });
  }

  getProfileImageStyle() {
    return 'url(' + this.HomeOwnerProfile.image + ')'
  }

  SignOut() {
    let alert = this.alertCtrl.create({
      title: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Okay',
          handler: data => {
            firebase.auth().signOut().then(() => {
              console.log('Signed Out');
              this.navCtrl.setRoot(LoginPage);

            }).catch((err) => {
              console.log('error occured while signing out');

            })
          }
        }
      ]
    })
    alert.present();
    // alert.dismiss();
  }
  viewHouse(myEvent) {
    console.log('image', myEvent);

    let popover = this.popoverCtrl.create(ProfileComponent, { image: myEvent });
    popover.present({
      ev: myEvent
    });
  }

}
export interface HomeOwnerProfile {
  uid: string;
  image?: string;
  fullname: string;
  gender: string;
  personalNumber: any;
  About: string;

}

