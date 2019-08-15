import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewHuntPage } from './new-hunt';

@NgModule({
  declarations: [
    NewHuntPage,
  ],
  imports: [
    IonicPageModule.forChild(NewHuntPage),
  ],
})
export class NewHuntPageModule {}
