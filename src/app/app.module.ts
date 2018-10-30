
import { OerDekripsiPageModule } from './../pages/oer-dekripsi/oer-dekripsi.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPageModule } from '../pages/login/login.module';
import { OpacSearchPageModule } from '../pages/opac-search/opac-search.module';
import { OpacDetailPageModule } from '../pages/opac-detail/opac-detail.module';
import { EtdSearchPageModule } from '../pages/etd-search/etd-search.module';
import { EtdAbstrakPageModule } from '../pages/etd-abstrak/etd-abstrak.module';
import { EtdDetailPageModule } from '../pages/etd-detail/etd-detail.module';
import { EtdFullPageModule } from '../pages/etd-full/etd-full.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { ProfilPageModule } from '../pages/profil/profil.module';
import { RiwayatPageModule } from '../pages/riwayat/riwayat.module';
import { PeminjamanPageModule } from '../pages/peminjaman/peminjaman.module';
import { RegistrasiPageModule } from './../pages/registrasi/registrasi.module';
import { HttpClientModule } from '@angular/common/http';
import { OpacService } from '../services/opac';
import { MemberService } from '../services/member';
import { ETDService } from '../services/etd';
import { UpdatepassPageModule } from '../pages/updatepass/updatepass.module';
import { ResetPassPageModule } from './../pages/reset-pass/reset-pass.module';
import { OerService } from './../services/oer';
import { OerSearchPageModule } from './../pages/oer-search/oer-search.module';
import { OerDetailPageModule } from '../pages/oer-detail/oer-detail.module';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { DocumentViewer } from '@ionic-native/document-viewer';


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    EtdDetailPageModule,
    EtdAbstrakPageModule,
    LoginPageModule,
    OpacSearchPageModule,
    OpacDetailPageModule,
    EtdSearchPageModule,
    EtdFullPageModule,
    TabsPageModule,
    ProfilPageModule,
    RiwayatPageModule,
    PeminjamanPageModule,
    RegistrasiPageModule,
    UpdatepassPageModule,
    ResetPassPageModule,
    OerSearchPageModule,
    OerDetailPageModule,
    OerDekripsiPageModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OpacService,
    MemberService,
    OerService,
    ETDService,
    SocialSharing,
    InAppBrowser,
    File,
    FileTransfer,
    FileTransferObject,
    DocumentViewer
  ]
})
export class AppModule {}
