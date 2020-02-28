import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-history-listening',
  templateUrl: './history-listening.component.html',
  styleUrls: ['./history-listening.component.css']
})
export class HistoryListeningComponent implements OnInit {

  @Input('title') title: string;
  @Input('src') src: string;
  @Input('script') script: string;
  @Input('type') type: string;
  constructor() {

  }

  ngOnInit() {
  }

}
