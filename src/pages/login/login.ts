import { Component } from '@angular/core';
import { IonicPage, AlertController, ToastController, NavController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { MemberService } from '../../services/member';

import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private memberService: MemberService,
              private alertController: AlertController,
              private toastController: ToastController,
              private navController: NavController,
              
              private loadingController: LoadingController) {}

  ionViewWillEnter(){
    if(this.memberService.cekLogin()) {
      this.navController.push(TabsPage);
    }
  }

  onLogin(form: NgForm) {
    const loading = this.loadingController.create({
      content: "Autentikasi Data Member..."
    });
    loading.present();

    this.memberService.login(form.value.member_id, form.value.password)
      .subscribe(
        (data) => {
          loading.dismiss();
          if(data.kode == 1){
            this.handleSuccess(data.pesan);
            this.navController.push(TabsPage);
          }else{
            this.handleError(data.pesan);
          }
        },
        error => {
          loading.dismiss();
          this.handleError(error);
        }
      );
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

}
