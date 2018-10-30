import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EtdFullPage } from './etd-full';

@NgModule({
  declarations: [
    EtdFullPage,
  ],
  imports: [
    IonicPageModule.forChild(EtdFullPage),
  ],
  exports: [
    EtdFullPage
  ]
})
export class EtdFullPageModule {}
