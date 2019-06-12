import { Component } from '@angular/core';

import { Platform } from 'ionic-angular';

//import { StatusBar, Splashscreen } from 'ionic-native';

import { StatusBar } from '@ionic-native/status-bar';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: `app.html`
})

export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      /*StatusBar.styleDefault();
      Splashscreen.hide();*/
    });
  }
}