import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EtdDetailPage } from './etd-detail';

@NgModule({
  declarations: [
    EtdDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(EtdDetailPage),
  ],
  exports: [
    EtdDetailPage
  ]
})
export class EtdDetailPageModule {}
