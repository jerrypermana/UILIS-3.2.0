import { Component, OnInit } from '@angular/core';
import { NavController, App, MenuController } from 'ionic-angular';

import { OpacSearchPage } from './../opac-search/opac-search';
import { EtdSearchPage } from './../etd-search/etd-search';
import { OerSearchPage } from '../oer-search/oer-search';
import { LoginPage } from '../login/login';
import { RegistrasiPage } from '../registrasi/registrasi';
import { ResetPassPage } from '../reset-pass/reset-pass';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  tahun: number;
  ImageArray: any=[];


  opacPage = OpacSearchPage;
  loginPage = LoginPage;
  etdPage = EtdSearchPage;
  regisPage = RegistrasiPage;
  resetPassPage= ResetPassPage;
  oerPage = OerSearchPage;

  // @ViewChild('nav') nav: NavController;
  constructor(
              private navCtrl: NavController,
              private app: App,
              private menuController: MenuController,
              public nav: NavController
              ) {

    this.ImageArray =[
        {'image':'http://uilis.unsyiah.ac.id/android_webservice/images_slider/1.jpg'},
        {'image':'http://uilis.unsyiah.ac.id/android_webservice/images_slider/2.jpg'},
        {'image':'http://uilis.unsyiah.ac.id/android_webservice/images_slider/3.jpg'}
     
    ]


    this.app._setDisableScroll(true);
  }

  ngOnInit() {
    this.tahun = new Date().getFullYear();
  }
  bukaHalaman(halaman: any) {
    this.nav.setRoot(halaman);
    this.menuController.close();
  }

}
