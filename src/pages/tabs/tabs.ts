
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { ProfilPage } from '../profil/profil';
import { RiwayatPage} from '../riwayat/riwayat';
import { PeminjamanPage} from '../peminjaman/peminjaman';
import { UpdatepassPage } from '../updatepass/updatepass';

UpdatepassPage
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  profilPage = ProfilPage;
  riwayatPage = RiwayatPage;
  peminjamanPage = PeminjamanPage;
  updatepassPage = UpdatepassPage;

}
