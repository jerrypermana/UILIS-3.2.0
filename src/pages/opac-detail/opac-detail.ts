import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, LoadingController, AlertController, ViewController, ToastController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { OpacService } from '../../services/opac';

import { OpacModel } from '../../models/opac';

@IonicPage()
@Component({
  selector: 'page-opac-detail',
  templateUrl: 'opac-detail.html',
})
export class OpacDetailPage implements OnInit {

  buku: OpacModel = new OpacModel('','','','','','','','','','','','','','','', []);
  id: number;

  constructor(private opacService: OpacService,
              private loadingCOntroller: LoadingController,
              private alertController: AlertController,
              private navParams: NavParams,
              private viewController: ViewController,
              private socialSharing: SocialSharing,
              private toastController: ToastController) {}

  ngOnInit() {
    this.id = this.navParams.get('id');

    const loading = this.loadingCOntroller.create({
      content: 'Loading Data...'
    });
    loading.present();

    this.opacService.getDetail(this.id)
      .subscribe(
        (data: OpacModel) => {
          loading.dismiss();
          this.buku = data;

          if (typeof this.buku.image === 'undefined' || this.buku.image === null) {
            this.buku.image = this.opacService.path_gambar_default + "nobook.png";
          }else{
            this.buku.image = this.opacService.path_gambar_docs + this.buku.image;
          }
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

  tutup() {
    this.viewController.dismiss();
  }

  onShare(aplikasi: string) {
    switch(aplikasi) {
      case 'facebook' :
          this.socialSharing.shareViaFacebookWithPasteMessageHint(this.buku.title + "\n" + this.opacService.opac_detail_link + this.id + "\n\n- dibagikan dari UILIS Perpustakaan UNSYIAH", this.buku.image, this.opacService.opac_detail_link + this.id, "Caption telah disalin ke clipboard.")
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
          this.socialSharing.shareViaTwitter(this.buku.title + "- UILIS Perpustakaan UNSYIAH", this.buku.image, this.opacService.opac_detail_link + this.id)
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
          this.socialSharing.shareViaWhatsApp(this.buku.title + "- dibagikan dari UILIS Perpustakaan UNSYIAH", this.buku.image, this.opacService.opac_detail_link + this.id)
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
            url: this.opacService.opac_detail_link + this.id,
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

}
