import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EtdAbstrakPage } from './etd-abstrak';

@NgModule({
  declarations: [
    EtdAbstrakPage,
  ],
  imports: [
    IonicPageModule.forChild(EtdAbstrakPage),
  ],
  exports: [
    EtdAbstrakPage
  ]
})
export class EtdAbstrakPageModule {}
