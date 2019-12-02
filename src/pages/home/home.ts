import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { NavController, MenuController, Platform, Slides, PopoverController, AlertController, NavParams, LoadingController, Keyboard, Content, App } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { BuilderProfileviewPage } from '../builder-profileview/builder-profileview';
import * as firebase from 'firebase';
import { CallNumber } from '@ionic-native/call-number';
import { ProfileComponent } from '../../components/profile/profile';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { QuotationFormPage } from '../quotation-form/quotation-form';
import { BuilderMessagesPage } from '../builder-messages/builder-messages';
//import { TestPage } from '../test/test';
declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  scrollContent: boolean = true;
  activateSearch: boolean = false;
  icon: string = 'search';
  showBuilders = false;
  btnAll = 'All';
  iconAll = 'arrow-up';
  uid = firebase.auth().currentUser.uid;
  getUsers: boolean;
  db = firebase.firestore().collection('Users');
  dbRequest = firebase.firestore().collection('Request');
  dbFeeback = firebase.firestore().collection('Feedback');
  profile = {
    image: '',
    name: '',
    address: ''
  };
   constructor(public keyboard: Keyboard, private renderer: Renderer2, private elementRef: ElementRef, public navCtrl: NavController, private authService: AuthServiceProvider, private popoverCtrl: PopoverController) {
    /* Profile of logged in user */
    this. getUserProfile();

    this.db.doc(this.uid).onSnapshot((res) => {
      if (res.data().builder == false) {
        this.getUsers = res.data().builder;
        console.log(this.getUsers);
        
        this.getBuilders(); 
      }else {
        this.getUsers = res.data().builder;
        console.log(this.getUsers);
        this.getRequests();
      }
    });
    
  }

 openSearch() {
   if(this.activateSearch) {

    
     this.activateSearch = false;
     this.icon = 'search';
     this.showBuilders = true;
        this.showAllBuilders();
     
   }else {
    
      this.activateSearch = true;
      this.showBuilders = false;
        this.showAllBuilders();
     this.icon = 'close';
   }
 }


 getUserProfile() {
   this.db.doc(this.uid).onSnapshot((usersLoggedIn) => {
     this.profile.image = usersLoggedIn.data().image;
     this.profile.name = usersLoggedIn.data().fullName;
     this.profile.address = usersLoggedIn.data().ownerAddress;
     console.log(this.profile);
     
   })
 }


  keyboardListener(ev) {
    console.log(ev);
    if(this.keyboard.isOpen()) {

      if(!this.getUsers) {
        this.showBuilders = false;
        this.showAllBuilders();
      }else {
        this.showBuilders = true;
        this.showAllBuilders();
      }
     
      
      
    }else {
    
      this.renderer.setStyle(this.elementRef.nativeElement.children[1].children[1].children[1], 'overflow', 'unset');
     /*  this.renderer.setStyle(this.elementRef.nativeElement.children[1].children[1].children[1].children[0], 'flex-basis', '20%');
      this.renderer.setStyle(this.elementRef.nativeElement.children[1].children[1].children[1].children[1], 'flex', '30%'); */
      this.renderer.setStyle(this.elementRef.nativeElement.children[1].children[1].children[1].children[2], 'display', 'flex'); 
    }
  }
  showAllBuilders() {

      console.log(this.elementRef.nativeElement.children[1].children[1].children[1].children[2]);
      let allBuilders = this.elementRef.nativeElement.children[1].children[1].children[1].children[2];
      let cards = this.elementRef.nativeElement.children[1].children[1].children[1].children[2].children[1].children.length;
      

     
      console.log(cards, 'dfjdn')

      if(this.showBuilders == false) {
      this.showBuilders = true;
      this.activateSearch = true;
      this.icon = 'close';
      this.btnAll = 'Hide'
      this.iconAll = 'arrow-down'
      this.renderer.addClass(allBuilders, 'cards-expand');
      for(let i = 0; i < cards; i ++) {
        let card = this.elementRef.nativeElement.children[1].children[1].children[1].children[2].children[1].children[i];
        this.renderer.setStyle(card, 'transition', 'all 500ms');
        
        
        
      } 
    }else {
      this.showBuilders = false;
      this.btnAll = 'All'
      this.iconAll = 'arrow-up'
     
      this.renderer.removeClass(allBuilders, 'cards-expand');
      for(let i = 0; i < cards; i ++) {
        let card = this.elementRef.nativeElement.children[1].children[1].children[1].children[2].children[1].children[i];
        this.renderer.setStyle(card, 'transition', 'all 500ms');
      } 

    } 
  }
//   @ViewChild('slides') slides: Slides;
//   @ViewChild("map") mapElement: ElementRef;

//   map: any;
//   //input: any;
  
//   dbChat = firebase.firestore().collection('chat_msg');
//   autoCompSearch = document.getElementsByClassName('searchbar-input');
//   hideCard = document.getElementsByClassName('slider');
//   items: any;
//   info = false;
   builder = [];
   buildesAverage = []
   owner = [];
//   status: string = '';
//   maps: boolean = false;
//   request: boolean = false;
//   loaderAnimate = true
//   ownerUID: string;
//   ownerName;
//   ownerImage: any;
//   bUID: string;
//   price = 0;
//   /* Search variables */
//   location = false;
//   name = false;
//   range = false;
//   header='jasnfkfmks';
//   uid = firebase.auth().currentUser.uid;
//   /* Search variebles */
//   homeowner = false;
//   message = '';
//   isBuilder;
//   input = '';
//   menuShow: boolean = true;
//   directionsService = new google.maps.DirectionsService();
//   directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
//   geoData = {
//     lat: 0,
//     lng: 0
//   }
//   msgStatus;
//   total: number;
//   avgRate: number;
//   ratingArr = [];
//   sumRated = 0;
//   fullName = '';
//   userImg = '';
//   // sumRate=0;
     noReviews = 'No reviews yet';
//   autocom: any;
//   constructor(public navCtrl: NavController,
//     public geolocation: Geolocation,
//     public navParams: NavParams,
//     public platform: Platform,
//     public popoverCtrl: PopoverController,
//     public elementref: ElementRef,
//     public alertCtrl: AlertController, public loadingCtrl: LoadingController, public renderer: Renderer2) {


//   }
//   checkKeyboard(data) {
//     if (data == 'open') {
//       //this.hid='value';
//       this.renderer.setStyle(this.hideCard[0], 'transform', 'translateY(40vh)');
//       this.menuShow = false;

//     } else {
//       this.renderer.setStyle(this.hideCard[0], 'transform', 'translateY(0)');
//       this.menuShow = true
//     }
//     // console.log(data);

//   }
//   AutoComplete() {

//     this.autocom = new google.maps.places.Autocomplete(this.autoCompSearch[0], { types: ['geocode'] });
//     this.autocom.addListener('place_changed', () => {
//       let place = this.autocom.getPlace();
//       console.log(place);
//       let latLng = {
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng(),
//       }
//       this.map.panTo(latLng);
//     });

//   }
//   RangeSearch() {
//     this.range = !this.range;
//   }
// /* ionViewWillEnter(){
//   this.db.doc(this.uid).onSnapshot((res) => {
//     if (res.data().builder == false) {
//       //this.loadCtrl();
//       //document.getElementById('header').style.display = "none";
//       this.getPosition();
//     }
//   })
// } */
//   ionViewDidLoad() {
//     setTimeout(() => {
//       this.AutoComplete()
//     }, 1000);
//     setTimeout(() => {
//       this.loaderAnimate = false
//     }, 2000);
    // this.db.doc(this.uid).onSnapshot((res) => {
    //   if (res.data().builder == false) {
    //     //this.loadCtrl();
    //     //document.getElementById('header').style.display = "none";
    //    // this.loadMap();
    //     this.getPosition();
    //   }
//       if (res.data().builder == true) {
//         this.getRequests();
//       }
//     })

//     // console.log(this.navParams.data);

//     // this.getRequests();
//     // this.loadMap();
//     this.isBuilder = firebase.auth().currentUser.uid;
//     console.log('check if the user is a builder: ', this.isBuilder);
//     // if (this.authService.manageUsers() == true) {
//     //   this.getUser = "Home Builder";
//     // } else {
//     //   this.getUser = "Aspiring Home Owner"

//     // }
//   }

//   moveMapEvent() {

//     let currentIndex = this.slides.getActiveIndex();
//     let currentEvent = this.builder[currentIndex];
//     // this.map.setCenter({ lat: currentEvent.lat, lng: currentEvent.lng })
//     //this.loadCtrl();
//     this.geolocation.getCurrentPosition().then((resp) => {
//       let geoData = {
//         lat: resp.coords.latitude,
//         lng: resp.coords.longitude
//       }

//       let start = new google.maps.LatLng(geoData.lat, geoData.lng);
//       let end = new google.maps.LatLng(currentEvent.lat, currentEvent.lng)
//       const that = this;
//       this.directionsService.route({
//         origin: start,
//         destination: end,
//         travelMode: 'DRIVING',
//         unitSystem: google.maps.UnitSystem.METRIC,
//         // icon: 'https://img.icons8.com/color/24/000000/worker-male--v2.png'
//       },
//         (response, status) => {
//           if (status === 'OK') {
//             that.directionsDisplay.setDirections(response);
//             this.total = 0;
//             let myroute = response.routes[0];
//             for (let i = 0; i < myroute.legs.length; i++) {
//               this.total += myroute.legs[i].distance.value;
//             }
//             this.total = this.total / 1000;
//             //console.log(this.total);

//           }

//         });
//     })
//   }

//   getPosition(): any {
//     this.geolocation.getCurrentPosition().then(resp => {
//       let coords = {
//         lat: resp.coords.latitude,
//         lng: resp.coords.longitude
//       } 
//       this.loadMap(coords);
//       //console.log('current loc', resp);
      
//       // add a marker, will be different from the driving schools
//       const marker = new google.maps.Marker({
//         position: coords,
//         map: this.map,
//         icon: 'https://img.icons8.com/nolan/40/000000/user-location.png'
//       })
//       // add an info window to the user marker
//       let infoWindow = new google.maps.InfoWindow({
//         content: `You`
//       });
//       marker.addListener('click', () => {
//         infoWindow.open(this.map, marker);
//       })
//     }).catch(err => {
//       let coords = {
//         lat: 26.2041,
//         lng: 28.0473
//       }
//       console.log('current loc err',err);
      
//       this.loadMap(coords);
//     })   
//   }
//   loadCtrl() {
//     this.loadingCtrl.create({
//       content: 'Please wait..',
//       duration: 2000
//     }).present()
//   }

  async getBuilders() {

    let numRated = 0;
    let arr = [];
    let avgSum = 0
    let avgTotal = []
    let data = { builder: {}, rate: { average: null } }

    //>>>>>>> get the builder
    await this.db.where('builder', '==', true).onSnapshot(async (res) => {
      this.builder = [];
      let info = { rate: {}, builder: {} };
      //>>>>>>> get the reviews made for this builder
      res.forEach(async (doc) => {
        //  console.log('All builders............', doc.data().lat);

        if (doc.data().address !== "" && doc.data().status == true) {
          data.builder = doc.data()
          this.builder.push(doc.data())
          // data.builder

          // this.errorMessage('User found',doc.id)

         // console.log('>>>>>>>>>>>>>>>',doc.data());

          /* let myLatLng = new google.maps.LatLng(doc.data().lat, doc.data().lng) */
          // console.log('builder pos', myLatLng);
          
         /*  let marker = new google.maps.Marker({
            position: myLatLng,
            map: this.map,
            title: 'Hello World!',
            icon: "https://img.icons8.com/color/40/000000/worker-male--v2.png"
          }); */
         /*  google.maps.event.addListener(marker, 'click', (resp) => {
            this.viewBuilderInfo(doc.data());
          }) */
          // data = {builder: doc.data()}

          //>>>>>>>>>> push for display
          // console.log('DOC DISPLAY >>>>>>>>>', data);
          // this.builder.push(data);

          // clear the stores
          avgSum = 0
          avgTotal.length = 0
          // data.builder = {}
          data.rate.average = null

        }


      })
      //   console.log('Loop 2 done');

      // console.log(this.builder);
      this.calcAvg()
    })
  }
  async calcAvg() {
    let avgTotal = []
    let avgSum = 0;
    let Average = 0;

    let arrBuild = [];
    let build = {
      uid: '',
      avg: null
    }
    for (let i = 0; i < this.builder.length; i++) {
      await this.dbFeeback.where('builder', '==', this.builder[i].uid).get().then((res1) => {
        if (!res1.empty) {
          res1.forEach((doc) => {

            //>>>>>>> store the total number of reviews made
            avgTotal.push(doc.data())

            //>>>>>>> store the sum of the ratings given by the user
            avgSum = avgSum + doc.data().rating;

            // this.ratingArr.push(doc.data().rating);
            // this.avgRate = this.sumRated / this.ratingArr.length;     
            build.uid = this.builder[i].uid


          })
          //  console.log('Loop 1 done');
          //>>>>>>> calculate the average
          Average = avgSum / avgTotal.length;
          build.avg = Average
          this.buildesAverage.push(build)
          Average = 0
          avgTotal = []
          avgSum = 0
          build = {
            uid: '',
            avg: null
          }
        } else {
          this.noReviews;
        }

      })

      //  console.log('AVG CALCULATION >>>>>>>>>',this.buildesAverage);

    }

  }
//   errorMessage(errCode, errMsg) {
//     const alert = this.alertCtrl.create({
//       title: errCode,
//       subTitle: errMsg,
//       buttons: ['OK']
//     });
//     alert.present();
//   }

//    loadMap(coords) {

//     this.input = 'Message of the input search show';
//     this.header = '';
//     let SA_BOUNDS = {
//       north: -22.0913127581,
//       south: -34.8191663551,
//       west: 13.830120477,
//       east: 32.830120477,
//     };
//     let latlng = new google.maps.LatLng(coords.lat, coords.lng);
//     this.map = new google.maps.Map(this.mapElement.nativeElement, {
//       center: latlng,
//       restriction: {
//         latLngBounds: SA_BOUNDS,
//         strictBounds: true,
//       },
//       zoom: 9,
//       disableDefaultUI: true,
//       styles: [
//         {
//           "elementType": "geometry",
//           "stylers": [
//             {
//               "color": "#f5f5f5"
//             }
//           ]
//         },
//         {
//           "elementType": "labels.icon",
//           "stylers": [
//             {
//               "visibility": "off"
//             }
//           ]
//         },
//         {
//           "elementType": "labels.text.fill",
//           "stylers": [
//             {
//               "color": "#616161"
//             }
//           ]
//         },
//         {
//           "elementType": "labels.text.stroke",
//           "stylers": [
//             {
//               "color": "#f5f5f5"
//             }
//           ]
//         },
//         {
//           "featureType": "administrative.land_parcel",
//           "elementType": "labels.text.fill",
//           "stylers": [
//             {
//               "color": "#bdbdbd"
//             }
//           ]
//         },
//         {
//           "featureType": "poi",
//           "elementType": "geometry",
//           "stylers": [
//             {
//               "color": "#eeeeee"
//             }
//           ]
//         },
//         {
//           "featureType": "poi",
//           "elementType": "labels.text.fill",
//           "stylers": [
//             {
//               "color": "#757575"
//             }
//           ]
//         },
//         {
//           "featureType": "poi.park",
//           "elementType": "geometry",
//           "stylers": [
//             {
//               "color": "#e5e5e5"
//             }
//           ]
//         },
//         {
//           "featureType": "poi.park",
//           "elementType": "labels.text.fill",
//           "stylers": [
//             {
//               "color": "#9e9e9e"
//             }
//           ]
//         },
//         {
//           "featureType": "road",
//           "elementType": "geometry",
//           "stylers": [
//             {
//               "color": "#ffffff"
//             }
//           ]
//         },
//         {
//           "featureType": "road.arterial",
//           "elementType": "labels.text.fill",
//           "stylers": [
//             {
//               "color": "#757575"
//             }
//           ]
//         },
//         {
//           "featureType": "road.highway",
//           "elementType": "geometry",
//           "stylers": [
//             {
//               "color": "#dadada"
//             }
//           ]
//         },
//         {
//           "featureType": "road.highway",
//           "elementType": "labels.text.fill",
//           "stylers": [
//             {
//               "color": "#616161"
//             }
//           ]
//         },
//         {
//           "featureType": "road.local",
//           "elementType": "labels.text.fill",
//           "stylers": [
//             {
//               "color": "#9e9e9e"
//             }
//           ]
//         },
//         {
//           "featureType": "transit.line",
//           "elementType": "geometry",
//           "stylers": [
//             {
//               "color": "#e5e5e5"
//             }
//           ]
//         },
//         {
//           "featureType": "transit.station",
//           "elementType": "geometry",
//           "stylers": [
//             {
//               "color": "#eeeeee"
//             }
//           ]
//         },
//         {
//           "featureType": "water",
//           "elementType": "geometry",
//           "stylers": [
//             {
//               "color": "#c9c9c9"
//             }
//           ]
//         },
//         {
//           "featureType": "water",
//           "elementType": "labels.text.fill",
//           "stylers": [
//             {
//               "color": "#9e9e9e"
//             }
//           ]
//         }
//       ]
//     });
//     google.maps.event.addDomListener(this.map, 'click', () => {
//       this.renderer.setStyle(this.hideCard[0], 'transform', 'translateY(0)');
//       this.menuShow = true;
//     });
//     this.getBuilders();



//     setTimeout(() => {
//       let input = document.getElementsByClassName('pac-input')

//       // console.log('search input',input[0])


//       let searchBox = new google.maps.places.SearchBox(input[0]);
//       //this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input[0]);
//       // Bias the SearchBox results towards current map's viewport.
//       this.map.addListener('SA_BOUNDS', (res) => {
//         searchBox.setBounds(this.map.getBounds());
//       });
//       let markers = [];
//       // Listen for the event fired when the user selects a prediction and retrieve
//       // more details for that place.
//       searchBox.addListener('places_changed', (res) => {
//         let places = searchBox.getPlaces();
//         if (places.length == 0) {
//           return;
//         }
//         // Clear out the old markers.
//         markers.forEach((marker) => {
//           marker.setMap(null);
//         });
//         markers = [];
//         // For each place, get the icon, name and location.
//         let bounds = new google.maps.LatLngBounds();
//         places.forEach((place) => {
//           if (!place.geometry) {
//             console.log("Returned place contains no geometry");
//             return;
//           }
//           let icon = {
//             url: place.icon,
//             size: new google.maps.Size(71, 71),
//             origin: new google.maps.Point(0, 0),
//             anchor: new google.maps.Point(17, 34),
//             scaledSize: new google.maps.Size(25, 25)
//           };
//           // Create a marker for each place.
//           markers.push(new google.maps.Marker({
//             map: this.map,
//             icon: icon,
//             title: place.name,
//             position: place.geometry.location
//           }));
//           if (place.geometry.viewport) {
//             // Only geocodes have viewport.
//             bounds.union(place.geometry.viewport);
//           } else {
//             bounds.extend(place.geometry.location);
//           }
//         });
//         this.map.fitBounds(bounds);
//       });
//     }, 1000);
//     this.directionsDisplay.setMap(this.map)
//     // this.directionsDisplay.setPanel(document.getElementById('right-panel'));
//   }

//   setMapCenter(position: Geoposition) {
//     let myLatLng = { lat: position.coords.latitude, lng: position.coords.longitude };
//     this.map.setCenter(myLatLng);
//     let marker = new google.maps.Marker({
//       position: myLatLng,
//       map: this.map,
//       title: 'Hello World!',
//       icon: 'https://img.icons8.com/nolan/40/000000/user-location.png'
//     });
//   }

//   async setPriceRange(param) {
//     this.price = param;
//     this.builder = [];
//     // console.log("Price range = "+ this.price);
//     if (this.price >= 0) {
//       await this.db.where('price', '>=', param)
//         .onSnapshot((res) => {
//           this.builder = [];
//           // console.log(res.);
//           res.forEach((doc) => {
//             // this.db.collection('builderProfile').get().then(snapshot => {
//             //   snapshot.forEach(doc => {
//             this.builder.push(doc.data());
//             this.bUID = doc.id;
//           })
//         })
//     }
//   }
  viewProfile(myEvent) {
    let popover = this.popoverCtrl.create(ProfileComponent, { image: myEvent });
    popover.present({
      ev: myEvent
    });
  }
//   viewHouse(myEvent) {
//     console.log('image', myEvent);
//     let popover = this.popoverCtrl.create(ProfileComponent, { image: myEvent });
//     popover.present({
//       ev: myEvent
//     });
//   }
//   // callJoint(phoneNumber) {
//   //   this.callNumber.callNumber(phoneNumber, true);
//   // }
//   //viewmore
  viewBuilderInfo(builder) {
    this.navCtrl.push(BuilderProfileviewPage, builder);
  }

  viewRequest(docID, uid) {
    this.navCtrl.push(BuilderMessagesPage, { docID, uid });
    //  console.log('Doc id>>>>',docID,'user id===', uid);
  }

  requestForm() {
    this.navCtrl.push(QuotationFormPage)
  }

  rShortcut(uid) {
    this.navCtrl.push(QuotationFormPage, uid);
  }



  getRequests() {
    let data = { info: {}, user: {}, id: {} }
    this.owner = [];
    this.dbRequest.where('builderUID', '==', this.uid).onSnapshot(res => {
      // console.log(res.size);
      res.forEach((bDoc) => {
        this.db.doc(bDoc.data().hOwnerUid).get().then((res) => {
          data.info = bDoc.data();
          data.id = bDoc.id;
          data.user = res.data();
          //  console.log(data);

          this.owner.push(data)
          data = { info: {}, user: {}, id: {} }
        })

      })
    })
    this.builder = [];
    this.owner = [];
  }


}



