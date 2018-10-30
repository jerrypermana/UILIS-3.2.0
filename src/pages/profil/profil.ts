import { Component } from '@angular/core';
import { IonicPage, LoadingController, AlertController, Platform, NavController } from 'ionic-angular';

import { MemberService } from '../../services/member';

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  dataProfil: any;

  constructor(private loadingController: LoadingController,
              private alertController: AlertController,
              private memberService: MemberService,
              private platform: Platform,
              private navController: NavController) {
                this.dataProfil = {
                  'foto': false,
                  'member_name': "",
                  'member_image': "",
                  "member_type_name": "",
                  "member_id": "",
                  "member_email": "",
                  "nama_prodi": "",
                  "nama_jur": "",
                  "fakultas_name": "",
                  "register_date": "",
                  "expire_date": ""
                };
              }

  ionViewWillEnter() {
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
    const loading = this.loadingController.create({
      content: "Mengambil Data Profil ..."
    });
    loading.present();

    this.memberService.getBiodata(this.memberService.getMemberId())
      .subscribe(
        (data) => {
          loading.dismiss();
          this.dataProfil = data;
        },
        error => {
          loading.dismiss();
          this.handleError(error);
        }
      );
  }

  logout() {
    this.memberService.logout();
    this.platform.exitApp();
  }

}
