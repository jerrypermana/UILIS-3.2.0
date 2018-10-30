import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

import { SearchsModel } from '../models/searchs';
import { OerModel } from '../models/oer';

import 'rxjs/Rx';

@Injectable()
export class OerService {

  private oer_link = 'http://uilis.unsyiah.ac.id/android_webservice/index.php/OerController/';

  public oer_detail_link = "http://uilis.unsyiah.ac.id/oer/items/show/";

  public path_gambar_docs = 'http://uilis.unsyiah.ac.id/oer/files/square_thumbnails/';
  public path_gambar_default = 'http://uilis.unsyiah.ac.id/oer/files/';
  public path_pdf = 'http://uilis.unsyiah.ac.id/oer/files/original/';
  //public path_image = 'http://uilis.unsyiah.ac.id/oer/files/square_thumbnails/';

  private cari = 'cari/';
  private detail = 'detail/';


  constructor (private http: Http) {}

  cariBukuOer(query: string, halaman: number) {
    return this.http
      .get(this.oer_link + this.cari + query + '/' + halaman)
      .map( (response: Response) => {

        let bukus: SearchsModel = {max_page: 0, data: []};

        if(response.json().hasOwnProperty('max_page')) {
          bukus = response.json();

          for(let item of bukus.data) {
            if (item.image === 'pdf') {
                // variable is undefined or null
                item.image = this.path_gambar_default + "nobook.png";
            }else{
                item.image = this.path_gambar_docs + item.image;
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
      .get(this.oer_link + this.detail + id)
      .map( (response: Response) => {
        let buku: OerModel = response.json().data;
        return buku;
      });
  }
 

  
}
