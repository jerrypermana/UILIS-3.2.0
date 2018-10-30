import { Component } from '@angular/core';
import { IonicPage, AlertController, ModalController } from 'ionic-angular';

import { OpacService } from '../../services/opac';

import { SearchsModel } from '../../models/searchs';

import { OpacDetailPage } from '../opac-detail/opac-detail';

@IonicPage()
@Component({
  selector: 'page-opac-search',
  templateUrl: 'opac-search.html',
})
export class OpacSearchPage {

  searchBarAktif = false;
  bukus: SearchsModel = {max_page: 0, data: []};
  halaman: number = 0;
  query: string = '';

  loading = false;
  no_data = false;

  constructor (private opacService: OpacService,
              private alertController: AlertController,
              private modalController: ModalController) {
  }

  ionViewWillEnter() {
    this.cari({target: {value: 'Unsyiah'}});
  }

  toggleSearchBar() {
    if(this.searchBarAktif) {
      this.searchBarAktif = false;
    } else {
      this.searchBarAktif = true;
    }
  }

  cari(ev: any) {
    this.loading = true;
    if(this.query != ev.target.value){
      this.bukus = {max_page: 0, data: []};
    }
    
    this.opacService.cariBuku(ev.target.value, this.halaman)
      .subscribe(
        (data: SearchsModel) => {
          this.loading = false;
          if(data.max_page >= 0){
            if(this.query == ev.target.value){
              this.bukus.data = this.bukus.data.concat(data.data);
            }else{
              this.bukus = data;
            }
            this.no_data = false;
          }else{
            this.bukus = {max_page: 0, data: []};
            this.no_data = true;
          }

          this.query = ev.target.value;
        },
        error => {
          this.loading = false;
          this.handleError(error.json().error);
        }
      );
  }

  doInfinite(infiniteScroll) {
    if(this.halaman < this.bukus.max_page) {
      this.halaman++;
      this.cari({target: {value: this.query}});
    }

    infiniteScroll.complete();
  }

  bukaDetail(id: number) {
    const modal = this.modalController.create(OpacDetailPage, {id: id});
    modal.present();
  }

  private handleError(pesanError: string) {
    this.alertController.create({
      title: "Error !",
      message: pesanError,
      buttons: ['Ok']
    });
  }

}
