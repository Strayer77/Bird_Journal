import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HuntService } from '../../providers/hunt-service/hunt-service';
import { Hunt } from '../../models/hunt.model';



@IonicPage()
@Component({
  selector: 'page-view-hunt',
  templateUrl: 'view-hunt.html',
})
export class ViewHuntPage {
  hunt: Hunt;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private huntService: HuntService) {
      //retrieves hunt object by using NavParams.get
      this.hunt = this.navParams.get('hunt');
  }

  deleteHunt(createDate: number) {
    this.huntService.deleteHunt(createDate);
    this.navCtrl.pop();
  }

}