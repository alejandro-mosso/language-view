import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryListeningComponent } from './history-listening/history-listening.component';
import { HistoryProgressControllerComponent } from './history-progress-controller/history-progress-controller.component';
import { HistoryListComponent } from './history-list/history-list.component';
import { YouglishComponent } from './youglish/youglish.component';
import { RecordYourselfComponent } from './record-yourself/record-yourself.component';
import { HistoryMenuComponent } from './history-menu/history-menu.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

const routes: Routes = [
  {path: 'file-upload', component: FileUploadComponent},
  {path: 'story-listening', component: HistoryListeningComponent},
  {path: 'story-progress-control/:id/:title', component: HistoryProgressControllerComponent},
  {path: 'story-progress-control/:id/', component: HistoryProgressControllerComponent},
  {path: 'story-list', component: HistoryListComponent},
  {path: 'listening', component: YouglishComponent},
  {path: 'record', component: RecordYourselfComponent},
  {path: '', component: HistoryMenuComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
