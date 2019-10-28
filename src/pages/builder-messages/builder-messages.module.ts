import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuilderMessagesPage } from './builder-messages';

@NgModule({
  declarations: [
    BuilderMessagesPage,
  ],
  imports: [
    IonicPageModule.forChild(BuilderMessagesPage),
  ],
})
export class BuilderMessagesPageModule {}
