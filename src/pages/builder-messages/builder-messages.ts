import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import { CallNumber } from '@ionic-native/call-number';
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
  drop: boolean = true;
  imageBuilder: string;
  @ViewChild('slides') slides: Slides;
  dbChat = firebase.firestore().collection('chat_msg');
  dbChatting = firebase.firestore().collection('chatting');
  dbIncoming = firebase.firestore().collection('Request');
  dbProfile = firebase.firestore().collection('Users');
  dbSent = firebase.firestore().collection('Respond');
  uid = firebase.auth().currentUser.uid;
  chatMessage: any;
  myMsg: any;
  messages = [];
  msgSent = [];
  getowners = {
    image: '',
    fullName: '',
    personalNumber: '',
  };
  currentUid: any;
  incomingMsg = [];
  msgInfo = [];
  chat = [];

  toggle: boolean = false;
  icon: string = 'ios-arrow-up';
  extras = [];
  number: any;
  quoteStatus: any;
  text: string = "All";
  constructor(public navCtrl: NavController,
    private callNumber: CallNumber,
    public navParams: NavParams,
    private elementRef: ElementRef,
    private toastCtrl: ToastController
  ) {
    // this.imageBuilder = this.navParams.data.img;
    console.log('Nav params', this.navParams.data);
    this.messages = [];

  }
  open() {
    if (this.toggle == true) {
      this.toggle = false;
      this.icon = 'ios-arrow-down';

    } else {
      this.icon = 'ios-arrow-up';
      this.toggle = true;

    }

  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.slideChanged();
      this.slides.lockSwipes(true);
    }, 1000)
    let info = { data: {}, id: {}, user: {} }
    this.dbChat.doc(this.navParams.data.uid).collection(this.uid).orderBy('date', 'asc').onSnapshot((res) => {
      //  console.log('This doc ', res.docs);
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
          console.log('Message sent', this.msgSent);

          //         //this.number = doc.data().personalNumber;
          //       })
          //     })
          //    /// console.log('Messages found..', this.msgSent);

          //     })
          //     /*  setTimeout(() => {
          //       this.getOwnerDetails();
          //      }, 3000);
          //  */

        })
      })
    })

    this.getOwnerDetails()
  }
  viewMessages() {
    this.navCtrl.pop();
  }
  async slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    this.currentUid = this.msgSent[currentIndex].id;
    // let curr = this.messages[currentIndex];
    //  console.log('Current...', this.currentUid);
    const query = this.dbChatting.doc(this.navParams.data.uid).collection(this.uid).doc(this.currentUid).collection("convo").orderBy('date', 'asc')
    return await query.onSnapshot((res) => {
      this.msgInfo = [];
      for (let i = 0; i < res.docs.length; i++) {
        if (!res.docs[i].data().pdfLink) {
        } else {
          //  console.log('Not found.....');
        }
        this.msgInfo.push(res.docs[i].data())
      }
      console.log('Response data', this.msgInfo);

    });
  }
  /*   sslideChanged() {
      let currentIndex = this.slides.getActiveIndex();
      this.currentUid = this.msgSent[currentIndex].id;
      console.log('Current doc id', this.currentUid);
      console.log('Nav params', this.navParams.data);
  
      this.dbChatting.doc(this.navParams.data.uid).collection(this.uid).where('id', '==', this.msgSent[currentIndex].id).orderBy('date', 'asc').onSnapshot((res) => {
        this.msgInfo = [];
        for (let i = 0; i < res.docs.length; i++) {
          this.msgInfo.push(res.docs[i].data())
        }
        console.log('Message...', this.msgInfo);
      })
      this.dbSent.doc(this.currentUid).onSnapshot((doc) => {
        if (doc.data().msgStatus !== "") {
          ///  this.hideCard = '';
          this.quoteStatus = doc.data().msgStatus;
          // console.log('Status............................', this.quoteStatus);
          this.toastCtrl.create({
            closeButtonText: 'Close',
            message: 'Your quotes has been' + this.quoteStatus,
            duration: 2000,
          }).present();
        } else {
          console.log('wait for responses');
  
        }
      })
    } */
  getChats() {
   
    if (this.chatMessage != "") {
      this.dbChatting.doc(this.navParams.data.uid).collection(this.uid).doc(this.currentUid).collection("convo").add({ chat: this.chatMessage, date: new Date().getTime(), builder: true, id: this.currentUid }).then((res) => {
        res.onSnapshot((doc) => {
          this.chatMessage = '';
          this.myMsg = doc.data().chat
          console.log('This is what I sent now...', doc.data());
        })
      })
    }
  }
  respond() {

    
   this.navCtrl.push(BuilderquotesPage, { docID: this.currentUid, uid: this.navParams.data.uid });
  }
  getOwnerDetails() {
    this.dbProfile.doc(this.navParams.data.uid).onSnapshot(owners => {
      this.getowners.image = owners.data().image;
      this.getowners.fullName = owners.data().fullName;
      this.getowners.personalNumber = owners.data().personalNumber;
    })
  }
  getProfileImageStyle() {
    return 'url(' + this.getowners.image + ')'
  }
  callJoint(number) {
    this.callNumber.callNumber(number, true);
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
