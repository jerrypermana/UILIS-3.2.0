import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController } from 'ionic-angular';

import { ETDService } from '../../services/etd';

import { SearchsModel } from '../../models/searchs';

import { EtdDetailPage } from '../etd-detail/etd-detail';

@IonicPage()
@Component({
  selector: 'page-etd-search',
  templateUrl: 'etd-search.html',
})
export class EtdSearchPage {

  searchBarAktif = false;
  bukus: SearchsModel = {max_page: 0, data: []};
  halaman: number = 0;
  query: string = '';

  loading = false;
  no_data = false;

  constructor (private etdService: ETDService,
              private alertController: AlertController,
              private navController: NavController) {
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

    this.etdService.cariBuku(ev.target.value, this.halaman)
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
    this.navController.push(EtdDetailPage, {id: id});
  }

  private handleError(pesanError: string) {
    this.alertController.create({
      title: "Error !",
      message: pesanError,
      buttons: ['Ok']
    });
  }

}
