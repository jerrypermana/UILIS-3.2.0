import { SocialSharing } from '@ionic-native/social-sharing';
import { OerService } from './../../services/oer';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, LoadingController, AlertController, NavController, ViewController, ModalController, ToastController, ActionSheetController, Platform } from 'ionic-angular';
import { OerModel } from '../../models/oer';
import { OerDekripsiPage } from './../oer-dekripsi/oer-dekripsi';
import { InAppBrowser } from '../../../node_modules/@ionic-native/in-app-browser';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { DocumentViewer } from '@ionic-native/document-viewer';

/**
 * Generated class for the OerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-oer-detail',
  templateUrl: 'oer-detail.html',
})
export class OerDetailPage implements OnInit{

  buku: OerModel = new OerModel('','','','','','','','','','','','','');
  id: number;
  

  constructor(private oerService: OerService,
              private loadingCOntroller: LoadingController,
              private alertController: AlertController,
              private navParams: NavParams,
              private viewController: ViewController,
              private socialSharing: SocialSharing,
              private modalController: ModalController,
              private toastController: ToastController,
              private navController : NavController,
              private actionSheet: ActionSheetController,
              private platform: Platform,
              private transfer: FileTransfer, 
              private file: File,
              public fileTransfer: FileTransferObject,
              private document: DocumentViewer,
              private iap: InAppBrowser) {  }
  ngOnInit() {
    this.id = this.navParams.get('id');

    const loading = this.loadingCOntroller.create({
      content: 'Loading Data...'
    });
    loading.present();

    this.oerService.getDetail(this.id)
      .subscribe(
        (data: OerModel) => {
          loading.dismiss();
          this.buku = data;

          if (this.buku.image === 'pdf') {
            this.buku.image = this.oerService.path_gambar_default + "nobook.png";
          }else{
            this.buku.image = this.oerService.path_gambar_docs + this.buku.image;
          }
        },
        error => {
          loading.dismiss();
          this.handleError(error.json().error);
        }
      );
  }

 
  
  description() {
    const modal = this.modalController.create(OerDekripsiPage, {description: this.buku.Description, judul: this.buku.Title});
    modal.present();
  }

 
  // openLocalPdf() {
  //   if (this.buku.mime_type !== 'application/pdf') {

     
  //     const browser = this.iap.create(this.oerService.path_pdf + "/" + this.buku.filename, "_system", 'location=no');
  //     browser.show();
  //   }else{
  //     //const browser = this.iap.create(this.oerService.path_gambar_docs  + "/" + this.buku.filename, "_system", "zoom=yes,enableViewportScale=yes,location=no,closebuttoncaption=kembali,hardwareback=yes");
  //     const browser = this.iap.create(this.oerService.path_pdf + "/" + this.buku.filename, "_self", "zoom=yes,enableViewportScale=yes,location=no,closebuttoncaption=kembali,hardwareback=yes");
  //     browser.show();
      
  //   }
  
  // openLocalPdf() {

  //       const browser = this.iap.create(this.oerService.path_pdf + "/" + this.buku.filename, "_system", 'location=no');
  //       browser.show();

  // }
  openLocalPdf(){
    if (this.buku.mime_type !== 'application/pdf') {
      const browser = this.iap.create(this.oerService.path_pdf  + "/" + this.buku.filename, "_self", "zoom=yes,enableViewportScale=yes,location=no,closebuttoncaption=kembali,hardwareback=yes");
        browser.show();
    }else{
      let url = encodeURIComponent(this.oerService.path_pdf + "/" + this.buku.filename)
      this.iap.create('http://docs.google.com/viewer?url=' + url);
    }
  }

  openyoutube(){

    const browser = this.iap.create(this.buku.Source, "_system", "zoom=yes,enableViewportScale=yes,location=no,closebuttoncaption=kembali,hardwareback=yes");
    browser.show();

  }

  public download() {  
    //  const browser = this.iap.create(this.oerService.path_pdf + "/" + this.buku.filename, "_system", "zoom=no,enableViewportScale=yes,location=no,closebuttoncaption=kembali,hardwareback=yes");
    //  browser.show();

    
      let path = null;
   
      if (this.platform.is('ios')) {
        path = this.file.documentsDirectory;
      } else if (this.platform.is('android')) {
        path = this.file.externalDataDirectory;
      }
   
      const transfer = this.transfer.create();
      transfer.download(this.oerService.path_pdf + "/" + this.buku.filename, path + this.buku.filename).then(entry => {
        let url = entry.toURL();
        console.log('download complete: ' + entry.toURL());
        this.handleSuccess('download complete: ' + entry.toURL());

        //this.document.viewDocument(this.oerService.path_pdf + "/" + this.buku.filename, 'application/pdf', {});
      },(error) => {
        this.handleError(error);
        console.log('Error', error);
      });
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
    console.log(this.buku);
    switch(aplikasi) {
      case 'facebook' :
          this.socialSharing.shareViaFacebookWithPasteMessageHint(this.buku.Title + "\n" + this.oerService.oer_detail_link + this.id + "\n\n- dibagikan dari UILIS Perpustakaan UNSYIAH", this.buku.image, this.oerService.oer_detail_link + this.id, "Caption telah disalin ke clipboard.")
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
          this.socialSharing.shareViaTwitter(this.buku.Title + "- UILIS Perpustakaan UNSYIAH", this.buku.image, this.oerService.oer_detail_link + this.id)
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
          this.socialSharing.shareViaInstagram(this.buku.Title + "- dibagikan dari UILIS Perpustakaan UNSYIAH", this.buku.image)
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
          this.socialSharing.shareViaWhatsApp(this.buku.Title + "- dibagikan dari UILIS Perpustakaan UNSYIAH", this.buku.image, this.oerService.oer_detail_link + this.id)
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
            message: this.buku.Title + "- dibagikan dari UILIS Perpustakaan UNSYIAH",
            subject: 'Sharing buku UILIS - Perpustakaan UNSYIAH',
            files: [this.buku.image],
            url: this.oerService.oer_detail_link + this.id,
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
