
// import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

import { ProfilMemberModel } from '../models/profil-member';

import { OpacService } from './opac';

import 'rxjs/Rx';


@Injectable()
export class MemberService {
  private profilMember: ProfilMemberModel = {
    member_name: '',
    member_id: '',
    verify: ''
  };
  private isLogin: boolean = false;

  private member_link = 'http://202.4.186.65/android_webservice/index.php/MemberController/';
  

  //private member_link = 'http://localhost/android_webservice/index.php/MemberController/';


  private fungsi_login = "login";
  private fungsi_ambil_biodata = "ambil_biodata";
  private fungsi_ambil_riwayat = "ambil_riwayat";
  private fungsi_ambil_peminjaman = "ambil_pinjaman";
  private fungsi_perpanjangan_peminjaman = "perpanjang_pinjaman";
  private fungsi_update_password  = "updatePasswordUser";

  constructor(private http: Http,
              private opacService: OpacService) {}

  login(id: string, pass: number) {
    const data = {
      "member_id": id,
      "member_pwd": pass
    };

    return this.http
      .post(this.member_link + this.fungsi_login, data)
      .map( (response: Response) => {
        return response.json();
      })
      .do((data) => {
        if(data.kode == 1) {
          this.profilMember = data.data;
          this.isLogin = true;
        }else{
          this.isLogin = false;
          this.profilMember = {
            member_name: '',
            member_id: '',
            verify: ''
          };
        }
      });
  }

  logout() {
    this.profilMember = {
      member_name: '',
      member_id: '',
      verify: ''
    };
    this.isLogin = false;
  }

  cekLogin() {
    return this.isLogin;
  }

  getMemberId() {
    return this.profilMember.member_id;
  }

  getRiwayat(id: string, halaman: number) {
    const data = {
      "member_id": id
    };

    return this.http
      .post(this.member_link + this.fungsi_ambil_riwayat + "/" + halaman, data)
      .map( (response: Response) => {
        let data:any = response.text();

        if(data != ''){
          data = response.json();
          if(data.max_data > 0) {
            for(let item of data.bukus) {
              if (typeof item.image === 'undefined' || item.image === null) {
                  // variable is undefined or null
                  item.image = this.opacService.path_gambar_default + "nobook.png";
              }else{
                  item.image = this.opacService.path_gambar_docs + item.image;
              }
            }
          }
        }

        return data;
      });
  }

  getBiodata(id: string) {
    const data = {
      "member_id": id
    };

    return this.http
      .post(this.member_link + this.fungsi_ambil_biodata, data)
      .map( (response: Response) => {
        const data = response.json()[0];

        if (typeof data.member_image === 'undefined' || data.member_image === null) {
          data.foto = false;
        }else{
          data.foto = true;
        }

        return data;
      });
  }

  getPeminjaman(id: string, halaman: number) {
    const data = {
      "member_id": id
    };

    return this.http
      .post(this.member_link + this.fungsi_ambil_peminjaman + "/" + halaman, data)
      .map( (response: Response) => {
        let data:any = response.text();

        if (data != '') {
          data = response.json();

          for(let item of data.bukus) {

            if (typeof item.image === 'undefined' || item.image === null) {
                // variable is undefined or null
                item.image = this.opacService.path_gambar_default + "nobook.png";
            }else{
                item.image = this.opacService.path_gambar_docs + item.image;
            }

          };

        }

        return data;
      });
  }

  perpanjangBuku(id: string) {
    const data = {
      "loan_id": id
    };

    return this.http
      .post(this.member_link + this.fungsi_perpanjangan_peminjaman, data)
      .map( (response: Response) => {
        let data = '';

        if(response.text() != ''){
          data = response.json();
        }

        return data;
      });
  }


  registerMember(member_id){

    const data = {
      "member_id": member_id
    };

   // let headers    = new HttpHeaders({ 'Content-Type': 'application/json' })
    let  url      	= this.member_link + "register"


    return this.http
    .post(url, data)
    .map( (response: Response) => {
      let data = '';

      if(response.text() != ''){
        data = response.json();
      }

      return data;
    });


  }

  resetPassMember(member_id){

    const data = {
      "member_id": member_id
    };

   // let headers    = new HttpHeaders({ 'Content-Type': 'application/json' })
    let  url      	= this.member_link + "resetPasswordUser"


    return this.http
    .post(url, data)
    .map( (response: Response) => {
      let data = '';

      if(response.text() != ''){
        data = response.json();
      }

      return data;
    });


  }

   //proses update password
   updatePassword(userData){

    const userDataPass = {
      "member_id": userData.member_id,
      "password" : userData.password
    };

   // let headers    = new HttpHeaders({ 'Content-Type': 'application/json' })
    let  url      	= this.member_link + this.fungsi_update_password
    return this.http
    .post(url, userDataPass)
    .map( (response: Response) => {
      let data = '';

      if(response.text() != ''){
        data = response.json();
      }

      return data;
    });

  }
}
