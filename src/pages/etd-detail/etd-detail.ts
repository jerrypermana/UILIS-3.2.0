import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, LoadingController, AlertController, NavController, ToastController, ModalController, ActionSheetController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ETDService } from '../../services/etd';

import { EtdModel } from '../../models/etd';

import { EtdAbstrakPage } from '../etd-abstrak/etd-abstrak';
import { EtdFullPage } from '../etd-full/etd-full';

@IonicPage()
@Component({
  selector: 'page-etd-detail',
  templateUrl: 'etd-detail.html',
})
export class EtdDetailPage implements OnInit {

  buku: EtdModel = new EtdModel('','','','','','','','','','','','','','','','','','');
  id: number;
  link_flip_web = "http://etd.unsyiah.ac.id/ebook/index.php?id=";

  constructor(private etdService: ETDService,
              private loadingCOntroller: LoadingController,
              private alertController: AlertController,
              private navParams: NavParams,
              private navController: NavController,
              private socialSharing: SocialSharing,
              private toastController: ToastController,
              private modalController: ModalController,
              private iap: InAppBrowser,
              private actionSheet: ActionSheetController) {}

  ngOnInit() {
    this.id = this.navParams.get('id');

    const loading = this.loadingCOntroller.create({
      content: 'Loading Data...'
    });
    loading.present();

    this.etdService.getDetail(this.id)
      .subscribe(
        (data: EtdModel) => {
          loading.dismiss();
          this.buku = data;
        },
        error => {
          loading.dismiss();
          this.handleError(error.json().error);
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
      duration: 2500
    });
    toast.present();
  }

  onShare(aplikasi: string) {
    switch(aplikasi) {
      case 'facebook' :
          this.socialSharing.shareViaFacebookWithPasteMessageHint(this.buku.title + "\n" + this.etdService.etd_detail_link + this.id + "\n\n- dibagikan dari UILIS Perpustakaan UNSYIAH", this.buku.image, this.etdService.etd_detail_link + this.id, "Caption telah disalin ke clipboard.")
            .then(
              (data) => {
                this.handleSuccess("Berhasil dibagikan ke Facebook.");
              }
            )
            .catch(
              (error) => {
                this.handleError(error);
              }
            );
          break;
      case 'twitter' :
          this.socialSharing.shareViaTwitter(this.buku.title + "- UILIS Perpustakaan UNSYIAH", this.buku.image, this.etdService.etd_detail_link + this.id)
            .then(
              (data) => {
                this.handleSuccess("Berhasil dibagikan ke Twitter.");
              }
            )
            .catch(
              (error) => {
                this.handleError(error);
              }
            );
          break;
      case 'instagram' :
          this.socialSharing.shareViaInstagram(this.buku.title + "- dibagikan dari UILIS Perpustakaan UNSYIAH", this.buku.image)
            .then(
              (data) => {
                this.handleSuccess("Berhasil dibagikan ke Instagram.");
              }
            )
            .catch(
              (error) => {
                this.handleError(error);
              }
            );
          break;
      case 'whatsapp' :
          this.socialSharing.shareViaWhatsApp(this.buku.title + "- dibagikan dari UILIS Perpustakaan UNSYIAH", this.buku.image, this.etdService.etd_detail_link + this.id)
            .then(
              (data) => {
                this.handleSuccess("Berhasil dibagikan ke Instagram.");
              }
            )
            .catch(
              (error) => {
                this.handleError(error);
              }
            );
          break;
      default :
          const opsi = {
            message: this.buku.title + "- dibagikan dari UILIS Perpustakaan UNSYIAH",
            subject: 'Sharing buku UILIS - Perpustakaan UNSYIAH',
            files: [this.buku.image],
            url: this.etdService.etd_detail_link + this.id,
            chooserTitle: 'Pilih aplikasi'
          };

          this.socialSharing.shareWithOptions(opsi)
            .then(
              (data) => {
              }
            )
            .catch(
              (error) => {
                this.handleError(error);
              }
            );
          break;
    }
  }

  fullText() {
    if(this.buku.embargo == '0' || this.buku.embargo == '1'){
      this.tampilMenuFullText();
    }else if(this.buku.embargo == '2'){
      const toast = this.toastController.create({
        message: "Maaf, buku \"" + this.buku.title + "\" tidak tersedia online. Silahkan hubungi pihak perpustakaan.",
        duration: 5000
      });
      toast.present();
    }
  }

  abstrak() {
    const modal = this.modalController.create(EtdAbstrakPage, {abstrak: this.buku.notes, judul: this.buku.title});
    modal.present();
  }

  private tampilMenuFullText() {
    const action = this.actionSheet.create({
      title: "Pilih Mode Full Text",
      buttons: [
        {
          text: "Scroll",
          handler: () => {
            this.navController.push(EtdFullPage, {idBuku: this.id, gambar: this.buku.nim_sha1});
          }
        },
        {
          text: "Flip",
          handler: () => {
            this.openInApp();
          }
        },
        {
          text: "Batal",
          role: "cancel"
        }
      ]
    });
    action.present();
  }

  private openInApp() {
    const browser = this.iap.create(this.link_flip_web + this.id, "_self", "zoom=yes,enableViewportScale=yes,location=no,closebuttoncaption=kembali,hardwareback=yes");
    browser.show();
  }

}
