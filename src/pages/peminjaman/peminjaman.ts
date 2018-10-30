import { Component } from '@angular/core';
import { IonicPage, LoadingController, AlertController, NavController, Platform, ToastController } from 'ionic-angular';

import { MemberService } from '../../services/member';

@IonicPage()
@Component({
  selector: 'page-peminjamna',
  templateUrl: 'peminjaman.html',
})
export class PeminjamanPage {

  dataPinjaman: any;
  maxPage: number = 0;
  adaData: boolean = true;
  halamanPinjaman: number = 0;
  loading = false;

  constructor (private memberService: MemberService,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private navController: NavController,
              private platform: Platform,
              private toastController: ToastController) {}

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

  private handleSuccess(pesan: string) {
    const toast = this.toastController.create({
      message: pesan,
      duration: 2000
    });
    toast.present();
  }

  loadData() {
    this.loading = true;
    this.memberService.getPeminjaman(this.memberService.getMemberId(), this.halamanPinjaman)
      .subscribe(
        (data) => {
          this.loading = false;
          if(data) {
            this.adaData = true;
            this.maxPage = data.max_page;
            this.dataPinjaman = data.bukus;
          }else{
            this.adaData = false;
            this.dataPinjaman = [];
            this.halamanPinjaman = 0;
          }
        },
        error => {
          this.loading = false;
          this.handleError(error);
        }
      );
  }

  doInfinite(infiniteScroll) {
    if(this.halamanPinjaman < this.dataPinjaman.max_page) {
      this.halamanPinjaman++;
      this.loadData();
    }

    infiniteScroll.complete();
  }

  logout() {
    this.memberService.logout();
    this.platform.exitApp();
  }

  perpanjangBuku(status_renew: string, id_load: string, title: string) {
    if(status_renew == '1') {
      this.handleError("Maaf, buku telah di perpanjang sebelumnya. Silahkan kembalikan terlebih dahulu.");
    }else{
      const alert = this.alertController.create({
        title: "Konfirmasi Perpanjangan",
        message: "Apakah anda ingin memperpanjang buku <strong>" + title + "</strong> ?",
        buttons: [
          {
            text: "Batal",
            role: "cancel",
            handler: () => {

            }
          },
          {
            text: "Perpanjang",
            handler: () => {
              this.memberService.perpanjangBuku(id_load)
                .subscribe(
                  (data: any) => {
                    this.loading = false;
                    if(data == '') {
                      this.handleError("Tidak bisa menghubungkan ke server.");
                    }else{
                      if(data.kode == '0') {
                        this.handleError(data.pesan);
                      }else if(data.kode == '1') {
                        this.handleSuccess(data.pesan);
                        this.loadData();
                      }
                    }
                  },
                  error => {
                    this.handleError(error);
                  }
                );
            }
          }
        ]
      });
      alert.present();
    }
  }

}
