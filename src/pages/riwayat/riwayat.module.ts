import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RiwayatPage } from './riwayat';

@NgModule({
  declarations: [
    RiwayatPage,
  ],
  imports: [
    IonicPageModule.forChild(RiwayatPage),
  ],
  exports: [
    RiwayatPage
  ]
})
export class RiwayatPageModule {}
