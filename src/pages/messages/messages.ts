import { ChannelsPage } from './../channels/channels';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Slides, LoadingController, Platform, ToastController } from 'ionic-angular';
//import { ViewmessagePage } from '../viewmessage/viewmessage';
import * as firebase from 'firebase';
//import { FileOpener } from '@ionic-native/file-opener';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
//import { OneSignal } from '@ionic-native/onesignal';
//import { PopoverPage } from '../popover/popover';
import { CallNumber } from '@ionic-native/call-number';
import { File } from '@ionic-native/file';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader';
import { OneSignal } from '@ionic-native/onesignal';
//import { AndroidPermissions } from '@ionic-native/android-permissions';
//import pdfMake from 'pdfmake/build/pdfmake';
//import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader';
/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  db = firebase.firestore();
  @ViewChild('slides') slides: Slides;
  pdfObj = null;
  dbMessage = firebase.firestore().collection('Request');
  dbIncoming = firebase.firestore().collection('Respond');
  dbProfile = firebase.firestore().collection('Users');
  dbFeed = firebase.firestore().collection('Feedback');
  dbChat = firebase.firestore().collection('chat_msg');
  dbChatting = firebase.firestore().collection('chatting');
  hideCard = 'qeqw43453rwerf453efste45tergft';
  uid = firebase.auth().currentUser.uid;
  hideRev;
  slidesPerView: number = 1;
  messages = [];
  incomingRes = [];
  qDoc;
  honwerUID;
  hownerName;
  homebuilder: boolean; //testing if the css is working
  icon = 'ios-arrow-up';
  toggle = false;
  msg: any;
  disable: boolean = false;
  /* testing */
  autoUid: any;
  homeOwner: any;
  homeDetails: any;
  homeUid;
  projectRequirement = {
    brickType: '',
    wallType: '',
    date: '',
    comment: '',
    startDate: '',
    endDate: '',

    extras: []

  }
  imageBuilder;
  personalNumber = '';
  builderName = '';
  msgSent = [];
  builder = [];
  footer: boolean;
  chatMessage: string;
  myMsg = '';
  manageUser: boolean;
  chatting = [];
  msgRespond = [];
  pdfMsg = [];
  pdf = '';
  pdfIndex: {};
  //imageBuilder;
  currentUid = '';
  chat: number = Date.now();
  number: any;
  quoteStatus: string = '';
  drop: boolean = true;
  text: string = 'All';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    // private fileOpener: FileOpener,
    public elementref: ElementRef,
    public oneSignal: OneSignal,
    public renderer: Renderer2,
    public popoverCtrl: PopoverController,
    private callNumber: CallNumber,
    private file: File,
    private toastCtrl: ToastController,
    //  public androidPermissions: AndroidPermissions,
    private downloader: Downloader,
    public loader: LoadingController,
    public pltform: Platform
  ) {
    this.autoUid = this.navParams.data;
    this.builderName = this.autoUid.name;
    this.imageBuilder = this.autoUid.img;
    this.personalNumber = this.autoUid.personalNumber;



  }

  open() {
    if (this.toggle == true) {
      this.toggle = false;
      this.icon = 'ios-arrow-down';
      this.footer = false;
    } else {
      this.icon = 'ios-arrow-up';
      this.toggle = true;
      this.footer = true;
    }

  }
  /* Tesing if chats works */
  chats = [];



  async slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    this.currentUid = this.msgSent[currentIndex].id;
    // let curr = this.messages[currentIndex];
    //  console.log('Current...', this.currentUid);
    this.dbChat.doc(this.uid).collection(this.navParams.data.id).doc(this.currentUid).onSnapshot((doc) => {
      this.hideCard = '';
      this.quoteStatus = doc.data().status;
    })

    const query = this.dbChatting.doc(this.uid).collection(this.navParams.data.id).doc(this.currentUid).collection("convo").orderBy('date', 'asc')
    return await query.onSnapshot((res) => {
      this.messages = [];
      // this.pdfMsg = [];
      let files = 0;
      for (let i = 0; i < res.docs.length; i++) {
        if (res.docs[i].data().pdf) {
          files = files + 1
          this.messages.push({ chat: res.docs[i].data(), id: res.docs[i].id, count: files })
        } else {
          this.messages.push({ chat: res.docs[i].data(), id: res.docs[i].id })
        }
      }


      /*   this.messages.forEach((item)=>{
         console.log('Each response', item.chat.pdf);
        }) */

    });


  }

  /* Ends here */
  acceptQoute(id) {
    this.disable = true;
    this.dbChatting.doc(this.uid).collection(this.navParams.data.id).doc(this.currentUid).collection("convo").doc(id).update({ status: "accepted" }).then((res) => {
      this.dbProfile.doc(this.navParams.data.id).get().then((resUser) => {
        if (resUser.data().tokenID) {
          var notificationObj = {
            contents: { en: "Hey " + resUser.data().fullName + " ," + "has accepted your quotation" },
            include_player_ids: [resUser.data().tokenID],
          };
          this.oneSignal.postNotification(notificationObj).then(res => {
          });
        }
      });
    })
  }
  declineQoute(id) {
    this.disable = true;
    this.dbChatting.doc(this.uid).collection(this.navParams.data.id).doc(this.currentUid).collection("convo").doc(id).update({ status: "declined" }).then((res) => {
      this.dbProfile.doc(this.navParams.data.id).get().then((resUser) => {
        if (resUser.data().tokenID) {
          var notificationObj = {
            contents: { en: "Hey " + resUser.data().fullName + " ," + "has declined your quotation" },
            include_player_ids: [resUser.data().tokenID],
          };
          this.oneSignal.postNotification(notificationObj).then(res => {
          });
        }
      });
    })
  }
  ionViewDidLoad() {
    console.log('Nav Params', this.navParams.data);

    setTimeout(() => {
      this.slideChanged();
      this.slides.lockSwipes(true);
    }, 1000)
    this.dbIncoming.where('hOwnerUID', '==', this.uid).onSnapshot((res) => {
      res.forEach((doc) => {
        let pdf = doc.data().pdfLink;
        this.pdf = pdf;
      })
    })
    let info = { data: {}, id: {}, user: {} }
    this.dbChat.doc(this.uid).collection(this.navParams.data.id).onSnapshot((res) => {
      // console.log('This doc ', doc.data());
      this.msgSent = [];
      res.forEach((doc) => {
        // console.log('Message data', doc.data());
        // quering builder personal number
        this.dbProfile.doc(doc.data().builderUID).onSnapshot((response) => {
          info.data = doc.data();
          info.id = doc.id;
          info.user = response.data();
          this.msgSent.push(info)
          info = { data: {}, id: {}, user: {} }
          // console.log('Message sent', this.msgSent);

          //this.number = doc.data().personalNumber;
        })
      })
      /// console.log('Messages found..', this.msgSent);

    })
  }
  /*   viewQuotes() {
     
        this.file.writeFile(this.file.dataDirectory, 'quotation.pdf', blob, { replace: true }).then(fileEntry => {
          this.fileOpener.open(this.file.dataDirectory + 'quotation.pdf', 'application/pdf');
        })
     
    } */
  brick = 'Engineering brick' //demo
  getChats() {
    if (this.chatMessage !== '') {
      this.dbChatting.doc(this.uid).collection(this.navParams.data.id).doc(this.currentUid).collection("convo").add({ chat: this.chatMessage, date: new Date().getTime(), builder: false, id: this.currentUid, status: "" }).then((res) => {
        res.onSnapshot((doc) => {
          this.chatMessage = '';
          this.myMsg = doc.data().chat
          //  console.log('This is what I sent now...', doc.data()); 
          //  this.chatMessage = doc.data().chat
        })
      })
    } else {
      this.toastCtrl.create({
        position: 'top',
        message: 'Please write a message...',
        duration: 1000,
        cssClass: 'ToastCtrl'
      })
    }

  }
  /*  presentPopover(uid) {
     const popover = this.popoverCtrl.create(PopoverPage, { key1: uid });
     popover.present();
   } */
  downloadPDF(pdf) {
    this.loader.create({
      content: "Downloading...",
      duration: 3000
    }).present();
    console.log('PDF link..', pdf);
    let request: DownloadRequest = {
      uri: pdf,
      title: 'Yakha quote' + new Date().toLocaleString,
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
        dirType: 'Downloads',
        subPath: 'yakha'
      }
    };
    this.downloader.download(request)
      .then((location: string) => console.log('File downloaded at:' + location))
      .catch((error: any) => console.error(error));
    //  this.pdfObj = pdfMake.createPdf();
    // this.pdfObj.getBuffer((buffer) => {
    /*   this.file.writeFile(this.file.dataDirectory, pdf+'.pdf', 'application/pdf', { replace: true }).then(fileEntry => {
        this.fileOpener.open(this.file.dataDirectory +  pdf+'.pdf', 'application/pdf');
      }) */
    // });
  }
  getProfileImageStyle() {
    return 'url(' + this.imageBuilder + ')';
  }
  callJoint(number) {

    this.callNumber.callNumber(number, true)
  }
  return() {
    this.navCtrl.pop();
  }

  viewMessages() {
    this.navCtrl.pop();
  }
  /*  itemSelected(item) {
     this.navCtrl.push(ViewmessagePage, item);
   } */
  userProfile() {
    console.log(this.hownerName);
  }

  dropDown() {
    if (this.drop == true) {
      this.drop = false;
      this.icon = 'ios-arrow-down';
      this.text = 'Hide';

    } else {
      this.drop = true;
      this.icon = 'ios-arrow-up';
      this.text = 'All';
    }
  }

}
