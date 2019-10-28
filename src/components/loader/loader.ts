import { Component } from '@angular/core';

/**
 * Generated class for the LoaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'loader',
  templateUrl: 'loader.html'
})
export class LoaderComponent {
  text: string;
  loaderAnimate = true;
  constructor() {
    console.log('Hello LoaderComponent Component');
    this.text = 'Hello World';
  }
  ionViewDidLoad(){
   setTimeout(() => {
     this.loaderAnimate = false;
   }, 3000);
  }

}
