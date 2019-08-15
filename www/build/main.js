webpackJsonp([2],{

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewHuntPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_hunt_service_hunt_service__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








//----------------------------------------------------------------------------------------------------------------------------
var NewHuntPage = /** @class */ (function () {
    function NewHuntPage(navCtrl, huntService, storage, camera, geolocation, toastCtrl) {
        this.navCtrl = navCtrl;
        this.huntService = huntService;
        this.storage = storage;
        this.camera = camera;
        this.geolocation = geolocation;
        this.toastCtrl = toastCtrl;
        this.date = new Date();
        this.myPhoto = '';
        this.content = '';
        this.myLocation = '';
        this.formGroup = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormGroup */]({
            content: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormControl */](),
            date: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormControl */](),
            coveysFound: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormControl */](),
            birdsTaken: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormControl */](),
            myPhoto: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormControl */](),
            myLocation: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormControl */](),
        });
    }
    //----------------------------------------------------------------------------------------------------------------------------
    //this function uses the geolocation native plugin and grabs the users
    //latitude and longitude and then saves it in the hunt object to be
    // displayed elsewhere
    NewHuntPage.prototype.getLocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            // resp.coords.latitude
            // resp.coords.longitude
            _this.myLocation = resp.coords.latitude + ', ' + resp.coords.longitude;
            var toast = _this.toastCtrl.create({
                message: 'Saving Coordinates...',
                duration: 1500,
            });
            toast.present();
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    //----------------------------------------------------------------------------------------------------------------------------
    //this function allows user to pick image from photo library and then saves it to the 
    //hunt object as myPhoto in base64 string format
    NewHuntPage.prototype.getImage = function () {
        var _this = this;
        var options = {
            quality: 80,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            _this.myPhoto = 'data:image/jpeg;base64,' + imageData;
            //document.write(this.myPhoto);
        }, function (err) {
            // Handle error
        });
    };
    //-------------------------------------------------------------------------
    //this function takes the photo and stores it in the hunt.myPhoto variable as base64
    NewHuntPage.prototype.takePhoto = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            _this.myPhoto = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            // Handle error
        });
    };
    //----------------------------------------------------------------------------------------------------------------------------
    //saves hunts in the new hunt page
    //invokes the method from the hunt service provider page
    NewHuntPage.prototype.saveHunt = function (hunt) {
        this.huntService.saveHunt(hunt);
        //use navctrl to pop current view off of stack and return to view
        //below that one on the stack - in this case the home page
        this.navCtrl.pop();
    };
    NewHuntPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-new-hunt',template:/*ion-inline-start:"/Users/Matt/Documents/GitHub/final-project-Strayer77/BirdJournal/src/pages/new-hunt/new-hunt.html"*/'<ion-header>\n    <ion-navbar>\n       <ion-title>New Hunt</ion-title>\n    </ion-navbar>\n </ion-header>\n <ion-content padding>\n    <form [formGroup]="formGroup" (ngSubmit)="saveHunt(formGroup.value)">\n    <ion-item>\n       <ion-label>Date</ion-label>\n       <ion-datetime displayFormat="MM/DD/YYYY" formControlName="date"></ion-datetime>\n    </ion-item>\n    <ion-item>\n       <ion-label>Coveys Found</ion-label>\n       <ion-item>\n         <ion-badge color="secondary">{{coveyNum}}</ion-badge>\n      </ion-item>\n       <ion-range min="0" max="30" color="secondary" pin="true" [(ngModel)]="coveyNum" formControlName="coveysFound">\n          <ion-icon small range-left name="custom-pheasantGroup-icon"></ion-icon>\n          <ion-icon range-right name="custom-pheasantGroup-icon"></ion-icon>\n       </ion-range>\n       <div class="alert" *ngIf="!formGroup.controls[\'content\'].valid\n          && formGroup.controls[\'content\'].touched">{{ coveysFoundAlert }}</div>\n    </ion-item>\n    <ion-item>\n       <ion-label>Birds Taken</ion-label>\n       <ion-range min="0" max="50" color="secondary" pin="true" [(ngModel)]="birdNum" formControlName="birdsTaken">\n          <ion-icon small range-left name="custom-quail-icon"></ion-icon>\n          <ion-icon range-right name="custom-quail-icon"></ion-icon>\n       </ion-range>\n       <div class="alert" *ngIf="!formGroup.controls[\'birdsTaken\'].valid\n          && formGroup.controls[\'content\'].touched">{{ birdsTakenAlert }}</div>\n    </ion-item>\n    <ion-item>\n       <ion-textarea type="text" placeholder="Add Note" name="content" formControlName ="content"></ion-textarea>\n       <div class="alert" *ngIf="!formGroup.controls[\'content\'].valid\n          && formGroup.controls[\'content\'].touched">{{ contentAlert }}</div>\n    </ion-item>\n    <ion-grid>\n      <ion-row>\n         <ion-col col-6>\n            <button type="button" ion-button color="blazeorange"(click)="takePhoto()" full>\n               Take Photo\n               <br>\n               <ion-icon class="ion-padding-end" name="camera"></ion-icon>\n            </button>\n         </ion-col>\n         <ion-col col-6>\n            <button type="button"  ion-button color="blazeorange"(click)="getImage()" full>\n               Add Photo\n               <br>\n               <ion-icon name="image"></ion-icon>\n            </button>\n         </ion-col>\n      </ion-row>\n      <ion-row>\n         <ion-col col-12>\n            <button type="button" ion-button color="blazeorange"(click)="getLocation()" full>\n               Geo-location\n               <br>\n               <ion-icon class="ion-padding-end" name="pin"></ion-icon>\n            </button>\n         </ion-col>\n      </ion-row>\n    </ion-grid>\n    <br>\n    <br>\n    <p><img [src]="myPhoto" *ngIf="myPhoto"></p>\n    <ion-input type="hidden" [value]="myPhoto" formControlName="myPhoto"></ion-input>\n    <ion-input type="hidden" [value]="myLocation" formControlName="myLocation"></ion-input>\n    <ion-grid>\n      <ion-row>\n         <ion-col col-4>\n         </ion-col>\n         <ion-col no-padding col-4>\n            <button ion-button full color="secondary" type="submit" [disabled]="!formGroup.valid">Save Hunt</button>\n         </ion-col>\n         <ion-col col-4>\n         </ion-col>\n      </ion-row>  \n    </ion-grid>\n    </form>\n </ion-content>\n \n'/*ion-inline-end:"/Users/Matt/Documents/GitHub/final-project-Strayer77/BirdJournal/src/pages/new-hunt/new-hunt.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_hunt_service_hunt_service__["a" /* HuntService */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */]])
    ], NewHuntPage);
    return NewHuntPage;
}());

//# sourceMappingURL=new-hunt.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewHuntPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_hunt_service_hunt_service__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ViewHuntPage = /** @class */ (function () {
    function ViewHuntPage(navCtrl, navParams, huntService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.huntService = huntService;
        //retrieves hunt object by using NavParams.get
        this.hunt = this.navParams.get('hunt');
    }
    ViewHuntPage.prototype.deleteHunt = function (createDate) {
        this.huntService.deleteHunt(createDate);
        this.navCtrl.pop();
    };
    ViewHuntPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-view-hunt',template:/*ion-inline-start:"/Users/Matt/Documents/GitHub/final-project-Strayer77/BirdJournal/src/pages/view-hunt/view-hunt.html"*/'<ion-header>\n    <ion-navbar>\n      <ion-title>View Hunt: {{ hunt.date }}</ion-title>\n    </ion-navbar>\n  </ion-header>\n  \n  <ion-content padding>\n    <ion-card>\n      <ion-card-content>\n        <ion-card-title>\n            <div class="hunt-date"><h1>{{ hunt.date }}</h1></div>\n        </ion-card-title>\n        <!--Only displays photo if photo was added by user-->\n        <img [src]="hunt.myPhoto" *ngIf="hunt.myPhoto !== null "/>\n        <ion-grid>\n          <ion-row>\n            <ion-col>\n              <div>\n                <p><ion-icon name="custom-pheasantGroup-icon"></ion-icon> Coveys Found: {{ hunt.coveysFound }}</p>\n              </div>\n            </ion-col>\n            <ion-col>\n              <div><p><ion-icon name="custom-quail-icon"></ion-icon> Birds Taken: {{ hunt.birdsTaken }} </p></div>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n              <div class="coords" full><p><ion-icon name="pin"></ion-icon>  {{ hunt.myLocation }}</p></div>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <br>\n            <ion-col>\n              <div class="notes"><p>{{ hunt.content }}</p></div>\n            </ion-col>\n          </ion-row>\n        </ion-grid> \n      </ion-card-content>\n    </ion-card>\n    <br>\n    <br>\n    <br>\n    <br>\n    <ion-row>\n      <ion-col col-4></ion-col>\n      <ion-col col-4>\n        <button ion-button color="danger" block (click)="deleteHunt(hunt.createDate)">\n          Delete Hunt\n          <br>\n          <ion-icon name="trash"></ion-icon>\n        </button>\n      </ion-col>\n      <ion-col col-4></ion-col>\n    </ion-row>  \n  </ion-content>\n    \n  \n  '/*ion-inline-end:"/Users/Matt/Documents/GitHub/final-project-Strayer77/BirdJournal/src/pages/view-hunt/view-hunt.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_hunt_service_hunt_service__["a" /* HuntService */]])
    ], ViewHuntPage);
    return ViewHuntPage;
}());

//# sourceMappingURL=view-hunt.js.map

/***/ }),

/***/ 114:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 114;

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/new-hunt/new-hunt.module": [
		276,
		1
	],
	"../pages/view-hunt/view-hunt.module": [
		277,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 155;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__new_hunt_new_hunt__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_hunt_service_hunt_service__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view_hunt_view_hunt__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, huntService) {
        this.navCtrl = navCtrl;
        this.huntService = huntService;
    }
    //life cycle event that runs when a page is about 
    //to enter and become active page
    HomePage.prototype.ionViewWillEnter = function () {
        this.hunts = this.getAllHunts();
    };
    HomePage.prototype.addHunt = function () {
        //uses navCtrl to push the New Hunt page on top of our route/nav stack
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__new_hunt_new_hunt__["a" /* NewHuntPage */]);
    };
    HomePage.prototype.getHunt = function (createDate) {
        var _this = this;
        this.huntService.getHunt(createDate).then(function (n) {
            _this.hunt = n;
            //use NavCtrl to push the view note page, aka go to that page
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__view_hunt_view_hunt__["a" /* ViewHuntPage */], { hunt: _this.hunt });
        });
    };
    //retrieves copy of array of all hunts using
    //the hunt service
    HomePage.prototype.getAllHunts = function () {
        return this.huntService.getAllHunts();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/Matt/Documents/GitHub/final-project-Strayer77/BirdJournal/src/pages/home/home.html"*/'<ion-header>\n    <ion-navbar>\n      <ion-title>\n        <img alt="logo" height="50" src="../../assets/imgs/Bird Journal-logo.png">\n      </ion-title>\n      <ion-buttons end>\n          <button type="button" ion-button icon-only (click)="addHunt()">\n            <ion-icon name="add"></ion-icon>\n          </button>\n        </ion-buttons>\n    </ion-navbar>\n  </ion-header>\n  \n  <ion-content>\n    <ion-grid>\n      <ion-row>\n        <ion-col *ngFor="let hunt of hunts | async" (click)="getHunt(hunt.createDate)" col-12>\n          <ion-card>\n            <ion-card-content>\n                <ion-item>\n                  <ion-thumbnail item-start>\n                    <img [src]="hunt.myPhoto" *ngIf="hunt.myPhoto !== null "/>\n                  </ion-thumbnail>\n                  <h1 class="hunt-date">{{ hunt.date }}</h1>\n                  <div>\n                    <ion-row>\n                      <ion-col>\n                        <p><ion-icon  *ngIf="hunt.coveysFound !== null " name="custom-pheasantGroup-icon"></ion-icon> : {{ hunt.coveysFound }} </p>\n                      </ion-col>\n                      <ion-col>\n                        <p><ion-icon *ngIf="hunt.birdsTaken !== null " name="custom-quail-icon"></ion-icon> : {{ hunt.birdsTaken }} </p>\n                      </ion-col>\n                      <ion-col></ion-col>\n                  </ion-row>\n                  </div>\n                </ion-item>\n            </ion-card-content>\n          </ion-card>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n      <!--the async will return the results of the promise in the home.ts and \n      put it in the template here-->\n      <!--<button ion-item *ngFor="let hunt of hunts | async" (click)="getHunt(hunt.createDate)">\n        {{ hunt.date }}\n      </button>-->\n    <ion-grid>\n      <ion-row>\n        <ion-col col-4></ion-col>\n        <ion-col col-4>\n          <button ion-button color="blazeorange" (click)="addHunt()" full>\n            New Hunt\n          </button>\n      </ion-col>\n      <ion-col col-4></ion-col>\n    </ion-row>\n  </ion-grid>\n  </ion-content>\n  \n  '/*ion-inline-end:"/Users/Matt/Documents/GitHub/final-project-Strayer77/BirdJournal/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_hunt_service_hunt_service__["a" /* HuntService */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(224);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_new_hunt_new_hunt__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_hunt_service_hunt_service__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_view_hunt_view_hunt__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_camera__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_geolocation__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_new_hunt_new_hunt__["a" /* NewHuntPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_view_hunt_view_hunt__["a" /* ViewHuntPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/new-hunt/new-hunt.module#NewHuntPageModule', name: 'NewHuntPage', segment: 'new-hunt', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/view-hunt/view-hunt.module#ViewHuntPageModule', name: 'ViewHuntPage', segment: 'view-hunt', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_forms__["f" /* ReactiveFormsModule */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_new_hunt_new_hunt__["a" /* NewHuntPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_view_hunt_view_hunt__["a" /* ViewHuntPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_8__providers_hunt_service_hunt_service__["a" /* HuntService */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_geolocation__["a" /* Geolocation */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(200);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/Matt/Documents/GitHub/final-project-Strayer77/BirdJournal/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/Matt/Documents/GitHub/final-project-Strayer77/BirdJournal/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HuntService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(81);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//----------------------------------------------------------------------------------------------------------------------------
var HuntService = /** @class */ (function () {
    //myPhoto: any;
    function HuntService(storage, camera) {
        this.storage = storage;
        this.camera = camera;
        this.hunts = [];
    }
    //----------------------------------------------------------------------------------------------------------------------------
    //allows us to save a hunt and pushes it to the array of hunts in storage
    HuntService.prototype.saveHunt = function (hunt) {
        hunt.createDate = Date.now(); //creates a unique number representing milliseconds that we use to identify individual hunts
        this.hunts.push(hunt);
        //use ionic storage to store key-value pairs as well
        //as json data from the newly created hunts
        //(data persistence)
        this.storage.set('hunts', this.hunts);
    };
    //----------------------------------------------------------------------------------------------------------------------------
    //method to retrieve all hunts
    HuntService.prototype.getAllHunts = function () {
        var _this = this;
        //retrieves hunts from storage via get which returns a promise
        //then it performs a function that returns hunts - if hunts
        //is null - returns empty array, else returns hunts in array
        return this.storage.get('hunts').then(function (hunts) {
            _this.hunts = hunts == null ? [] : hunts;
            return _this.hunts.slice(); //returns a copy of hunts array
        });
    };
    //----------------------------------------------------------------------------------------------------------------------------
    //gets a hunt from our collection of hunts using a key
    //returns a promise and then uses the create date identifier we passed to
    //return the hunt that has the matching createDate identifier
    HuntService.prototype.getHunt = function (createDate) {
        var _this = this;
        return this.storage.get('hunts').then(function (hunts) {
            _this.hunt = hunts.slice().find(function (r) { return r.createDate === createDate; });
            return _this.hunt;
        });
    };
    //----------------------------------------------------------------------------------------------------------------------------
    //returns the hunts array with all the hunts, except
    //the one that we want to delete by using the unique
    //identifier createDate and comparing those against the 
    //createDate of the specific note we want to delete
    //then setting the notes array as the one that was 
    //called from storage with the note we want to delete filtered
    //out -- essentially removing that note and resetting the array
    HuntService.prototype.deleteHunt = function (createDate) {
        this.hunts = this.hunts.filter(function (hunt) {
            return hunt.createDate !== createDate;
        });
        this.storage.set('hunts', this.hunts);
    };
    HuntService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */]])
    ], HuntService);
    return HuntService;
}());

//# sourceMappingURL=hunt-service.js.map

/***/ })

},[201]);
//# sourceMappingURL=main.js.map