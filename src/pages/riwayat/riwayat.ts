import { Component } from '@angular/core';
import { IonicPage, LoadingController, AlertController, NavController, Platform } from 'ionic-angular';

import { MemberService } from '../../services/member';

@IonicPage()
@Component({
  selector: 'page-riwayat',
  templateUrl: 'riwayat.html',
})
export class RiwayatPage {

  dataRiwayat: any;
  maxData: number = 0;
  maxPage: number = 0;
  adaData: boolean = true;
  halamanRiwayat: number = 0;
  loading = false;

  constructor (private memberService: MemberService,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private navController: NavController,
              private platform: Platform) {}

  ionViewWillEnter(){
    if(!this.memberService.cekLogin()){
      this.navController.pop();
    }
  }

  ionViewDidLoad() {
    this.loadData();
  }

  private handleError(pesanError: string) {
    const alert = this.alertController.create({
      title: "Error !",
      message: pesanError,
      buttons: ['Ok']
    });
    alert.present();
  }

  loadData() {
    this.loading = true;
    this.memberService.getRiwayat(this.memberService.getMemberId(), this.halamanRiwayat)
      .subscribe(
        (data) => {
          this.loading = false;
          if(data == '') {
            this.adaData = false;
            this.dataRiwayat = [];
            this.halamanRiwayat = 0;
          }else{
            this.adaData = true;
            this.maxData = data.max_data;
            this.maxPage = data.max_page;
            this.dataRiwayat = data.bukus;
          }
        },
        error => {
          this.loading = false;
          this.handleError(error);
        }
      );
  }

  doInfinite(infiniteScroll) {
    if(this.halamanRiwayat < this.dataRiwayat.max_page) {
      this.halamanRiwayat++;
      this.loadData();
    }

    infiniteScroll.complete();
  }

  logout() {
    this.memberService.logout();
    this.platform.exitApp();
  }
}
