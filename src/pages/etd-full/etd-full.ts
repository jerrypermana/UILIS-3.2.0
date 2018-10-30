import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { ETDService } from '../../services/etd';

@IonicPage()
@Component({
  selector: 'page-etd-full',
  templateUrl: 'etd-full.html',
})
export class EtdFullPage implements OnInit {

  id: number;
  nim_sha1: string;
  linkGambar: object[] = [];
  lanjut = true;
  loading: any;

  constructor(private navParams: NavParams,
              private etdService: ETDService,
              private alertController: AlertController,
              private loadingController: LoadingController) {  }

  ngOnInit() {
    this.id = this.navParams.get('idBuku');
    this.nim_sha1 = this.navParams.get('gambar');
    this.loadGambar();
  }

  loadGambar() {
    this.loading = this.loadingController.create({
      content: "Loading Data ..."
    });
    this.loading.present();

    this.etdService.cekFullSingle(this.nim_sha1)
      .subscribe(
        (data: number) => {
          if(data == 200)
            this.setArrayLink(300, 1);
        },
        error => {
          this.setArrayLink(300, 2);
        }
      );
  }

  private setArrayLink(posisiAkhir: number, jumlahPrefix: number) {
    for(let i = 1; i < posisiAkhir; i++) {

      let prefix: string;
      if(jumlahPrefix == 1) {
        if(i < 10) {
          prefix = "0";
        }else{
          prefix = "";
        }
      }else if(jumlahPrefix == 2) {
        if(i < 10) {
          prefix = "0";
        }
        // else if(i < 100) {
        //   prefix = "0";
        // }
        else{
          prefix = "";
        }
      }

      if(i == 10) {
        this.loading.dismiss();
      }

      const link = this.etdService.path_gambar_etd + this.nim_sha1 + "/" + this.nim_sha1 + "-" + prefix + i + ".png";
      if(this.imageExists(link)) {
        let gambar = {
          "link": link
        };
        this.linkGambar.push(gambar);
      }else{
        break;
      }
    }
  }

  private imageExists(image_url){
    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;
  }

}
