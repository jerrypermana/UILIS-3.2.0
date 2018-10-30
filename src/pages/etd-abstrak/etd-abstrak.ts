import { Component, OnInit } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-etd-abstrak',
  templateUrl: 'etd-abstrak.html',
})
export class EtdAbstrakPage implements OnInit {

  abstrak: string = "";
  judul: string = "";

  constructor(public viewController: ViewController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.abstrak = this.navParams.get('abstrak');
    this.judul = this.navParams.get('judul');
  }

  tutup() {
    this.viewController.dismiss();
  }

}
