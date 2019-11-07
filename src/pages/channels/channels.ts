import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessagesPage } from '../messages/messages';
import * as firebase from 'firebase'


@IonicPage()
@Component({
  selector: 'page-channels',
  templateUrl: 'channels.html',
})
export class ChannelsPage {
  dbRequest = firebase.firestore().collection('Request');
  dbUser = firebase.firestore().collection('Users');
  dbChat = firebase.firestore().collection('chat_msg');
  uid = firebase.auth().currentUser.uid;
  dat = {} as builderProfile;
  builder;
  respond = [];
  user;
  docID;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let data = {info: {}, user: {}, id: {}}
    this.dbRequest.where('hOwnerUid', '==', this.uid).onSnapshot(res => {
     // console.log(res.size);
    
      res.forEach((bDoc) => {
        this.dbUser.doc(bDoc.data().builderUID).get().then((res) => {
          data.info = bDoc.data(); 
        data.id = bDoc.id;
          data.user = res.data();
        //  console.log(data);
        
        this.respond.push(data)
        data = {info: {}, user: {}, id: {}}
        })
        
      }) 
    })
   /*  let data = { data: {}, user: {} }
    this.respond = [];
    this.dbChat.where('hOwnerUid','==',this.uid).onSnapshot((res) => {
      data = { data: {}, user: {} }
      this.respond = [];
    res.forEach((reqInfo)=>{    
        this.dbUser.doc(reqInfo.data().builderUID).onSnapshot((userDoc) => {
          data.data = reqInfo.data();
          data.user = userDoc.data();
          this.respond.push(data);
      data = { data: {}, user: {} }
      })
      
    })
    console.log('My messages', this.respond);
    
    }) */
  }
  gotoMessages(id, name) {
    this.navCtrl.push(MessagesPage, { id, name });
    console.log('Info clicked..', id, name);
   
  }
}
export interface builderProfile {
  uid: '',
  image: '',
  fullName: '',
  certified: false,
  experiences: '',
  address: '',
  price: '',
  location: '',
  roof: '',
  gender: ''
}
