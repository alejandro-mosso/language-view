import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { NgxAudioPlayerModule } from 'ngx-audio-player';

import { AppComponent } from './app.component';
import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { VgBufferingModule } from 'videogular2/compiled/buffering';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { RestClient } from './service/rest-client.service';
import { YouglishService } from './service/youglish.service';
import { TranslateService } from './service/translate.service';
import { DictionaryService } from './service/dictionary.service';
import { AudioService } from './service/audio.service';
import { IMediaService } from './service/i-media.service';
import { HistoryMenuService } from './service/history-menu.service';

import { HistoryListeningComponent } from './history-listening/history-listening.component';
import { HistoryProgressControllerComponent } from './history-progress-controller/history-progress-controller.component';
import { HistoryListComponent } from './history-list/history-list.component';
import { YouglishComponent } from './youglish/youglish.component';
import { RecordYourselfComponent } from './record-yourself/record-yourself.component';
import { HistoryMenuComponent } from './history-menu/history-menu.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileSizePipe } from './pipe/file-size.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HistoryListeningComponent,
    HistoryProgressControllerComponent,
    HistoryListComponent,
    YouglishComponent,
    RecordYourselfComponent,
    HistoryMenuComponent,
    FileUploadComponent,
    FileSizePipe
  ],
  imports: [
    HttpClientModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    NgxYoutubePlayerModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxAudioPlayerModule,
    //AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [
    RestClient,
    YouglishService,
    TranslateService,
    DictionaryService,
    AudioService,
    IMediaService,
    HistoryMenuService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
