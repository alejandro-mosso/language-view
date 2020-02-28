import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { IMediaModel } from '../model/i-media.model';
import { YouglishComponent } from '../youglish/youglish.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-history-progress-controller',
  templateUrl: './history-progress-controller.component.html',
  styleUrls: ['./history-progress-controller.component.css']
})
export class HistoryProgressControllerComponent implements OnInit {

  @Input('language') language: string = 'english';
  @Input('destination') destination: string = 'español';
  @Input('lan') lan: string = 'en';
  @Input('dest') dest: string = 'es';
  @ViewChild('youglish', {static: true})
  youglish;
  listenHistoryForm: FormGroup;
  youglishForm: FormGroup;
  recordYourselfForm: FormGroup;
  vocabularyAssessmentForm: FormGroup;

  listenHistoryChecked: boolean = false;
  selectedMedia:IMediaModel;
  idHistory: string;
  title: string;

  constructor(private _formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.paramMap.subscribe((params : ParamMap)=> {
          this.idHistory = params.get('id');
          this.title = params.get('title');
          console.log(this.title);
          console.log(this.idHistory);
        });
  }

  ngOnInit() {
    this.listenHistoryForm = this._formBuilder.group({
      listenHistoryChecked: ['', Validators.required], /*This is a Controller*/
    });
    this.youglishForm = this._formBuilder.group({
          youglishChecked: ['', Validators.required], /*This is a Controller*/
        });
    this.recordYourselfForm = this._formBuilder.group({
      recordYourselfChecked: ['', Validators.required], /*Check Box Controller*/
    });
    this.vocabularyAssessmentForm = this._formBuilder.group({
      vocabularyAssessmentChecked: ['', Validators.required], /*Check Box Controller*/
    });
  }

  selectMedia(media:IMediaModel) {
    this.selectedMedia = media;
    if (this.youglish != undefined)
      this.youglish.sourceText = undefined;
  }

}
