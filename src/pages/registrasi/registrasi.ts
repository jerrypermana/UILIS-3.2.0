// import { Response } from '@angular/http';
import { MemberService } from './../../services/member';
 import { AlertController, LoadingController } from 'ionic-angular';


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the RegistrasiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-registrasi',
  templateUrl: 'registrasi.html',
})
export class RegistrasiPage {

  // Property
  // public form                   : FormGroup;
  public registerMember         : any;
  public hideForm               : boolean = false;
  public pageTitle              : string;
  public recordID               : any      = null;
  loading = false;

 


  constructor(
               public  navCtrl              : NavController, 
               public  http                 : HttpClient,
               public  NP                   : NavParams,
               public  toastCtrl            : ToastController,
               private alertCtrl            : AlertController,
               public loadingController   : LoadingController,
               public memberService        : MemberService
              
              ) {

     
              }   

  public member : any;
  
  ionViewDidLoad(){

    let response : any;
    
  } 

    saveEntry(){

      const loading = this.loadingController.create({
        content: "Memverifikasi Data Keanggotaan..."
      });
      loading.present();

      this.memberService.registerMember(this.member)
      .subscribe(
        (respond: any) => {
         
          loading.dismiss();
          if(respond == '') {
            this.handleError("Tidak bisa menghubungkan ke server.");
          }else{
           
            if(respond.kode == '0') {
              this.handleError(respond.pesan);

            }else if(respond.kode == '1'){

              this.handleSuccess(respond.pesan);

            }
          }
        },
        error => {
          loading.dismiss();
          this.handleError(error);
        }
      );

           };

      
      private handleError(pesanError: string) {
        const alert = this.alertCtrl.create({
          title: "GAGAL !",
          message: pesanError,
          buttons: ['Ok']
        });11
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

     

