import { Component, OnInit, Input } from '@angular/core';
import { IMediaService } from '../service/i-media.service';
import { HistoryMenuService } from '../service/history-menu.service';
import { IMediaModel } from '../model/i-media.model';
import { HistoryMenuModel } from '../model/history-menu.model';

@Component({
  selector: 'app-history-menu',
  templateUrl: './history-menu.component.html',
  styleUrls: ['./history-menu.component.css']
})
export class HistoryMenuComponent implements OnInit {

  @Input('language') language: string = 'english';
  @Input('destination') destination: string = 'español';
  @Input('lan') lan: string = 'en';
  @Input('dest') dest: string = 'es';
  menuItems: Array<HistoryMenuModel>;

  constructor(private historyService: HistoryMenuService,
              private imediaService: IMediaService) {
    this.historyService.getHistories(this.language, this.destination).subscribe(
       ((response: Array<HistoryMenuModel>) => {
         this.menuItems = response;
       }), (error => {
         console.log(error);
       }));
  }

  ngOnInit() {
  }

}
