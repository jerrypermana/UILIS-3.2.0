import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OerDetailPage } from './oer-detail';

@NgModule({
  declarations: [
    OerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(OerDetailPage),
  ],
})
export class OerDetailPageModule {}
