import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

import { SearchsModel } from '../models/searchs';
import { EtdModel } from '../models/etd';

import 'rxjs/Rx';

@Injectable()
export class ETDService {

  private etd_link = 'http://uilis.unsyiah.ac.id/android_webservice/index.php/ETDController/';

  public etd_detail_link = "http://etd.unsyiah.ac.id/index.php?p=show_detail&id=";

  public path_gambar_docs = 'http://uilis.unsyiah.ac.id/uilis/images/docs/';
  public path_gambar_default = 'http://uilis.unsyiah.ac.id/opac/template/default/images/';

  private cari = 'cari/';
  private detail = 'detail/';

  public path_gambar_etd = "http://etd.unsyiah.ac.id/flip/images/";

  constructor (private http: Http) {}

  cariBuku(query: string, halaman: number) {
    return this.http
      .get(this.etd_link + this.cari + query + '/' + halaman)
      .map( (response: Response) => {

        let bukus: SearchsModel = {max_page: 0, data: []};

        if(response.json().hasOwnProperty('max_page')) {
          bukus = response.json();

          for(let item of bukus.data) {
            if (typeof item.image === 'undefined' || item.image === null) {
                // variable is undefined or null
                item.gambar = this.path_gambar_default + "nobook.png";
            }else{
                item.gambar = this.path_gambar_docs + item.image;
            }
          }
        }else{
          bukus = {max_page: 0, data: []};
        }

        return bukus;
      });
  }

  getDetail(id: number) {
    return this.http
      .get(this.etd_link + this.detail + id)
      .map( (response: Response) => {
        let buku: EtdModel = response.json().data;
        if (typeof buku.image === 'undefined' || buku.image === null) {
          buku.image = this.path_gambar_default + "nobook.png";
        }else{
          buku.image = this.path_gambar_docs + buku.image;
        }

        return buku;
      });
  }

  cekFullSingle(id: string) {
    return this.http
      .get(this.path_gambar_etd + id + "/" + id +"-01.png")
      .map( (response: Response) => {
        return response.status;
      });
  }

}
