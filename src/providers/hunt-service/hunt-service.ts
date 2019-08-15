import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Hunt } from '../../models/hunt.model';
import { Camera, CameraOptions } from '@ionic-native/camera';
//----------------------------------------------------------------------------------------------------------------------------

@Injectable()
export class HuntService {

  private hunts: Hunt[] = [];
  hunt: Hunt;
  //myPhoto: any;


  constructor(public storage: Storage, private camera: Camera) {
  }
//----------------------------------------------------------------------------------------------------------------------------
  //allows us to save a hunt and pushes it to the array of hunts in storage
  saveHunt(hunt: Hunt){
    hunt.createDate = Date.now(); //creates a unique number representing milliseconds that we use to identify individual hunts
    this.hunts.push(hunt);
    //use ionic storage to store key-value pairs as well
    //as json data from the newly created hunts
    //(data persistence)
    this.storage.set('hunts', this.hunts);
  }
//----------------------------------------------------------------------------------------------------------------------------
  //method to retrieve all hunts
  getAllHunts() {
    //retrieves hunts from storage via get which returns a promise
    //then it performs a function that returns hunts - if hunts
    //is null - returns empty array, else returns hunts in array
    return this.storage.get('hunts').then(
      (hunts) => {
        this.hunts = hunts == null ? [] : hunts;
        return [...this.hunts]; //returns a copy of hunts array
      }
    )
  }
//----------------------------------------------------------------------------------------------------------------------------
  //gets a hunt from our collection of hunts using a key
  //returns a promise and then uses the create date identifier we passed to
  //return the hunt that has the matching createDate identifier
  getHunt(createDate: number) {
    return this.storage.get('hunts').then((hunts) => {
      this.hunt = [...hunts].find(r => r.createDate === createDate);
      return this.hunt;
    });
  }
//----------------------------------------------------------------------------------------------------------------------------
  //returns the hunts array with all the hunts, except
  //the one that we want to delete by using the unique
  //identifier createDate and comparing those against the 
  //createDate of the specific note we want to delete
  //then setting the notes array as the one that was 
  //called from storage with the note we want to delete filtered
  //out -- essentially removing that note and resetting the array
  deleteHunt(createDate: number) {
    this.hunts = this.hunts.filter((hunt) => {
      return hunt.createDate !== createDate
    });
    this.storage.set('hunts', this.hunts);
  }
//----------------------------------------------------------------------------------------------------------------------------
  /*getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    
    this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    this.myPhoto = 'data:image/jpeg;base64,' + imageData;
    return this.myPhoto;
    }, (err) => {
    // Handle error
    });
  }*/

}
