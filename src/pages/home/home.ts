import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewHuntPage } from '../new-hunt/new-hunt';
import { HuntService } from '../../providers/hunt-service/hunt-service';
import { Hunt } from '../../models/hunt.model';
import { ViewHuntPage } from '../view-hunt/view-hunt';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private hunts: Promise<Hunt[]>
  private hunt: Hunt;

  constructor(public navCtrl: NavController, private huntService: HuntService) {

  }

  //life cycle event that runs when a page is about 
  //to enter and become active page
  ionViewWillEnter() {
    this.hunts = this.getAllHunts();
  }

  addHunt() {
    //uses navCtrl to push the New Hunt page on top of our route/nav stack
    this.navCtrl.push(NewHuntPage);
  }

  getHunt(createDate: number) {
    this.huntService.getHunt(createDate).then((n) => {
      this.hunt = n;
      //use NavCtrl to push the view note page, aka go to that page
      this.navCtrl.push(ViewHuntPage, { hunt: this.hunt });
    });
  }

  //retrieves copy of array of all hunts using
  //the hunt service
  getAllHunts() {
    return this.huntService.getAllHunts();
  }

}
