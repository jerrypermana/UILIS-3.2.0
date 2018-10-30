import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

import { SearchsModel } from '../models/searchs';
import { OpacModel } from '../models/opac';

import 'rxjs/Rx';

@Injectable()
export class OpacService {

  private opac_link = 'http://uilis.unsyiah.ac.id/android_webservice/index.php/OpacController/';

  public opac_detail_link = "http://uilis.unsyiah.ac.id/opac/index.php?p=show_detail&id=";

  public path_gambar_docs = 'http://uilis.unsyiah.ac.id/uilis/images/docs/';
  public path_gambar_default = 'http://uilis.unsyiah.ac.id/opac/template/default/images/';

  private cari = 'cari/';
  private detail = 'detail/';

  constructor (private http: Http) {}

  cariBuku(query: string, halaman: number) {
    return this.http
      .get(this.opac_link + this.cari + query + '/' + halaman)
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
      .get(this.opac_link + this.detail + id)
      .map( (response: Response) => {
        let buku: OpacModel = response.json().data;
        return buku;
      });
  }

}
