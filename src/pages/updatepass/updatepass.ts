import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController  } from 'ionic-angular';

import { MemberService } from '../../services/member';

/**
 * Generated class for the UpdatepassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-updatepass',
  templateUrl: 'updatepass.html',
})
export class UpdatepassPage {
  public updatePassword         : any;
  loading = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public memberService: MemberService,
    public loadingController   : LoadingController,
    public toastCtrl  : ToastController) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad UpdatepassPage');
  }

  //Form validasi password sederhana
  onPass(form){
    let passBaru = form.value.password1;
    if (passBaru == form.value.password2) {
      if ((Number(passBaru)) && (passBaru.length == 6)) {
        //jika berhasil validasi, maka akan dimasukkan kedalam JSON
        let userData = {
          member_id : this.memberService.getMemberId(),
          password  : passBaru
        }

        //mengirim JSON ke method updatePassword
        // this.updatePassword(userData);
        const loading = this.loadingController.create({
          content: "Loading..."
        });
        loading.present();

        this.memberService.updatePassword(userData)
        .subscribe(
        (respond: any) =>{

            // console.log(userData);
            // this.presentAlert('Sukses', 'Berhasil mengubah password.');
            loading.dismiss();
          if(respond == '') {
            this.handleError("Tidak bisa menghubungkan ke server.");
          }else{
           
            if(respond.kode == '0') {
              this.handleSuccess(respond.pesan);

            }else if(respond.kode == '1'){

              this.handleError(respond.pesan);

            }else if(respond.kode == '2'){

              this.handleError(respond.pesan);

            }
          }

        }

      );
    }
      else{
        this.presentAlert('Gagal', 'Pastikan Password adalah angka sebanyak 6 digit.');
      }
    }
    else{
      this.presentAlert('Gagal', 'Password tidak sama!');
    }
  }

  // //proses update password
  // updatePassword(data){
  //   //menampilkan data yang akan dikirim pada console
  //   console.log(data);
  //   this.presentAlert('Sukses', 'Berhasil mengubah password.');
  // }

  presentAlert(title, msg) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  private handleError(pesanError: string) {
    const alert = this.alertCtrl.create({
      title: "GAGAL !",
      message: pesanError,
      buttons: ['Ok']
    });
    alert.present();
  }

  private handleSuccess(pesan: string) {
    const toast = this.toastCtrl.create({
      message: pesan,
      duration: 2000
    });
    toast.present();
  }

}
