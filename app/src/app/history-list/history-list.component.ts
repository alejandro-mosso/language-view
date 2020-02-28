import { Component, OnInit, ViewChild, Input, Output, EventEmitter  } from '@angular/core';
import { IMediaModel } from '../model/i-media.model';
import { MatSelectionList, MatSelectionListChange } from "@angular/material/list";
import { IMediaService } from '../service/i-media.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit {

  @Input('title') listTitle: string = '';
  @Input('idHistory') idHistory: string;
  @Output('onChange')
  change:EventEmitter<IMediaModel> = new EventEmitter<IMediaModel>();
  @ViewChild('histories', {static: true})
  historiesList: MatSelectionList;
  playlist: Array<IMediaModel> = [];
  currentItem: IMediaModel;

  constructor(private imediaService: IMediaService) {
  }

  ngOnInit() {
    this.imediaService.getByHistoryId2(this.idHistory).subscribe(
      ((response: Array<IMediaModel>) => {
        this.playlist = response;
      }), (error => {
        console.log(error);
      }));;

    /*Makes exclusive selection in list*/
    this.historiesList.selectionChange.subscribe((s: MatSelectionListChange) => {
        this.historiesList.deselectAll();
        s.option.selected = true;
    });
  }

  onClickPlaylistItem(item: IMediaModel) {
    this.currentItem = item;
    this.change.emit(item);
  }

}
