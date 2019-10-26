import { Component } from '@angular/core';

/**
 * Generated class for the DescriptionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'description',
  templateUrl: 'description.html'
})
export class DescriptionComponent {

  text: string;

  constructor() {
    console.log('Hello DescriptionComponent Component');
    this.text = 'Hello World';
  }

}
