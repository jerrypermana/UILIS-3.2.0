import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OerSearchPage } from './oer-search';

@NgModule({
  declarations: [
    OerSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(OerSearchPage),
  ],
  exports: [
    OerSearchPage
  ]
})
export class OerSearchPageModule {}

