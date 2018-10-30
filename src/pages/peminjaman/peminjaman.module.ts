import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeminjamanPage } from './peminjaman';

@NgModule({
  declarations: [
    PeminjamanPage,
  ],
  imports: [
    IonicPageModule.forChild(PeminjamanPage),
  ],
  exports: [
    PeminjamanPage
  ]
})
export class PeminjamanPageModule {}
