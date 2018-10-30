import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EtdSearchPage } from './etd-search';

@NgModule({
  declarations: [
    EtdSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(EtdSearchPage),
  ],
  exports: [
    EtdSearchPage
  ]
})
export class EtdSearchPageModule {}
