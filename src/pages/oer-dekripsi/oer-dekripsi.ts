import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OerDekripsiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-oer-dekripsi',
  templateUrl: 'oer-dekripsi.html',
})
export class OerDekripsiPage {

  description: string = "";
  judul: string = "";
  constructor(
    public viewController: ViewController, 
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad OerDekripsiPage');
  // }
  ngOnInit() {
    this.description = this.navParams.get('description');
    this.judul = this.navParams.get('judul');
  }

  tutup() {
    this.viewController.dismiss();
  }
}
