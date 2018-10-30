


import { UpdatepassPage } from './../pages/updatepass/updatepass';
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { OerSearchPage } from './../pages/oer-search/oer-search';
import { HomePage } from '../pages/home/home';
import { OpacSearchPage } from '../pages/opac-search/opac-search';
import { LoginPage } from '../pages/login/login';
import { EtdSearchPage } from '../pages/etd-search/etd-search';
import { MemberService } from '../services/member';
import { RegistrasiPage } from '../pages/registrasi/registrasi';
import { ResetPassPage } from './../pages/reset-pass/reset-pass';
import { OerService } from './../services/oer';
import { OerDekripsiPage } from './../pages/oer-dekripsi/oer-dekripsi';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  opacPage = OpacSearchPage;
  loginPage = LoginPage;
  etdPage = EtdSearchPage;
  regisPage = RegistrasiPage;
  passPage  = UpdatepassPage;
  resetPassPage= ResetPassPage;
  oerPage = OerSearchPage;
  oerDeskPage = OerDekripsiPage;

  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuController: MenuController,
              private memberService: MemberService,
              private oerService: OerService
            ) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  bukaHalaman(halaman: any) {
    this.nav.setRoot(halaman);
    this.menuController.close();
  }
}
