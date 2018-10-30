import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpacSearchPage } from './opac-search';

@NgModule({
  declarations: [
    OpacSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(OpacSearchPage),
  ],
  exports: [
    OpacSearchPage
  ]
})
export class OpacSearchPageModule {}
