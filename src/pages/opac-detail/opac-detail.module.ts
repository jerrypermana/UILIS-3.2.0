import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpacDetailPage } from './opac-detail';

@NgModule({
  declarations: [
    OpacDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(OpacDetailPage),
  ],
  exports: [
    OpacDetailPage
  ]
})
export class OpacDetailPageModule {}
