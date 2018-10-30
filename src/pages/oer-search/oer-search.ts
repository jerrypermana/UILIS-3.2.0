import { OerService } from './../../services/oer';
import { Component } from '@angular/core';
import { IonicPage, AlertController, ModalController } from 'ionic-angular';
import { SearchsModel } from '../../models/searchs';
import { OerDetailPage } from '../oer-detail/oer-detail';



/**
 * Generated class for the OerSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-oer-search',
  templateUrl: 'oer-search.html',
})
export class OerSearchPage {

  searchBarAktif = false;
  bukus: SearchsModel = {max_page: 0, data: []};
  halaman: number = 0;
  query: string = '';

  loading = false;
  no_data = false;


   constructor (private oerService: OerService,
                private alertController: AlertController,
               private modalController: ModalController
             ) {
  }

  ionViewWillEnter() {
    this.cari({target: {value: 'calculus'}});
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

    this.oerService.cariBukuOer(ev.target.value, this.halaman)
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
    const modal = this.modalController.create(OerDetailPage, {id: id});
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
