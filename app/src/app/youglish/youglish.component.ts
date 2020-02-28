import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { YouglishService } from '../service/youglish.service';
import { TranslateService } from '../service/translate.service';
import { DictionaryService } from '../service/dictionary.service';
import { AudioService } from '../service/audio.service';
import { YouglishModel } from '../model/youglish.model';
import { TranslateModel } from '../model/translate.model';
import { DictionaryModel } from '../model/dictionary.model';
import { AudioModel } from '../model/audio.model';

@Component({
  selector: 'app-youglish',
  templateUrl: './youglish.component.html',
  styleUrls: ['./youglish.component.css']
})
export class YouglishComponent implements OnInit {

  @Input('text') text: string;
  @Input('language') language: string;
  @Input('destination') destination: string;
  @Input('lan') lan: string;
  @Input('dest') dest: string;
  _script: string;
  player;
  youglish: YouglishModel;
  definition: DictionaryModel;
  defTranslated: DictionaryModel;
  scriptArr;
  sourceText: string;
  textTranslated: string;
  audioModel: AudioModel;
  done: boolean = false;
  isPlaying: boolean = false;
  videoId: string = undefined;
  index: number = 0;
  playerVars = {
    start: 0,
    autoplay: 0,
    showinfo: 0,
    rel: 0,
    modestbranding: 1,
    cc_load_policy: 0
  };

  constructor(private service: YouglishService,
              private translate: TranslateService,
              private dictionary: DictionaryService,
              private audio: AudioService) {
    this.defTranslated = new DictionaryModel();
  }

  ngOnInit() {
  }

  @Input('script')
  set script(s) {
    if (s != undefined) {
        this._script = s;
        this.scriptArr = this.script.replace(/\./g, ' ').
          replace(/-/g, ' ').
          replace(/,/g, ' ').replace(/\?/g, ' ').split(' ');
        this.scriptArr = this.scriptArr.filter(word => word.trim().length > 0);
      }
  }
  get script() {
    return this._script;
  }

  search(text, language) {
    this.text = text;
    this.language = language;
    this.index = 0;

    this.audio.getAudio(text, language).subscribe(
     ((response: AudioModel) => {
       this.audioModel = response;
       console.log(this.audio);
     }),
     (error => {}));

    this.service.findVideos(this.text, this.language).subscribe(
      ((response: YouglishModel) => {
        this.youglish = response;
        if (this.youglish.results != undefined) {
          if (this.youglish.results.length > 0) {
            this.videoId = this.youglish.results[this.index].vid;
            this.playerVars.start = this.youglish.results[this.index].start;
            if (this.player == undefined) {
              this.player = this.createPlayer(this.videoId, this.playerVars);
            }
            else {
              this.cuePlayer(this.videoId, this.playerVars.start);
            }
          }
        }
      }),
      (error => {}));

    if (this.lan != undefined && this.dest != undefined) {
      this.translate.translate(text, this.lan, this.dest).subscribe(
        ((response: TranslateModel) => {
          this.sourceText = text;
          this.textTranslated = response.text;
        }), (error => {
          console.log(error);
        }));
      this.dictionary.meaning(text).subscribe(
       ((response: DictionaryModel) => {
         this.definition = response;
         this.translateDefinition();
       }), (error => {
         console.log(error);
       }));
    }
  }

  translateDefinition() {
    let tempStr: string = '';
    this.defTranslated = new DictionaryModel();
    if (this.definition.adjective != undefined) {
      this.defTranslated.adjective = [];
      for (let i = 0; i < this.definition.adjective.length; i++) {
        if (i == 0) {
          tempStr = tempStr + this.definition.adjective[i];
        }
        else {
          tempStr = tempStr + ' |\n| ' + this.definition.adjective[i];
        }
      }
      this.translate.translate(tempStr, this.lan, this.dest).subscribe(
        ((response: TranslateModel) => {
          this.defTranslated.adjective = response.text.split(' |\n| ');
        }), (error => {
          console.log(error);
        }));
    }
    tempStr = '';
    if (this.definition.adverb != undefined) {
        this.defTranslated.adverb = [];
        for (let i = 0; i < this.definition.adverb.length; i++) {
          if (i == 0) {
            tempStr = tempStr + this.definition.adverb[i];
          }
          else {
            tempStr = tempStr + ' |\n| ' + this.definition.adverb[i];
          }
        }
        this.translate.translate(tempStr, this.lan, this.dest).subscribe(
          ((response: TranslateModel) => {
            this.defTranslated.adverb = response.text.split(' |\n| ');
          }), (error => {
            console.log(error);
          }));
    }
    tempStr = '';
    if (this.definition.noun != undefined) {
        this.defTranslated.noun = [];
        for (let i = 0; i < this.definition.noun.length; i++) {
          if (i == 0) {
            tempStr = tempStr + this.definition.noun[i];
          }
          else {
            tempStr = tempStr + ' |\n| ' + this.definition.noun[i];
          }
        }
        this.translate.translate(tempStr, this.lan, this.dest).subscribe(
          ((response: TranslateModel) => {
            this.defTranslated.noun = response.text.split(' |\n| ');
          }), (error => {
            console.log(error);
          }));
    }
    tempStr = '';
    if (this.definition.verb != undefined) {
        this.defTranslated.verb = [];
        for (let i = 0; i < this.definition.verb.length; i++) {
          if (i == 0) {
            tempStr = tempStr + this.definition.verb[i];
          }
          else {
            tempStr = tempStr + ' |\n| ' + this.definition.verb[i];
          }
        }
        this.translate.translate(tempStr, this.lan, this.dest).subscribe(
          ((response: TranslateModel) => {
            this.defTranslated.verb = response.text.split(' |\n| ');
          }), (error => {
            console.log(error);
          }));
    }
  }

  isDefinitionFound() {
    return this.definition != undefined &&
          (this.definition.adjective != undefined ||
           this.definition.adverb != undefined ||
           this.definition.noun != undefined ||
           this.definition.verb != undefined);
  }

  createPlayer(videoId, playerVars) {
    (window as any).onYouTubeIframeAPIReady = function () {
      var player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: playerVars,
        events: {
          'onReady': this.onPlayerReady,
          'onStateChange': this.onPlayerStateChange
        }
      });
      return player;
    };
    return (window as any).onYouTubeIframeAPIReady();
  }

  loadPlayer(videoId, start) {
    this.player.loadVideoById(videoId, start);
  }

  cuePlayer(videoId, start) {
    this.player.cueVideoById(videoId, start);
  }

  onPlayerReady(event) {
    event.target.playVideo();
  }

  onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !this.done) {
      setTimeout(this.stopVideo, 6000);
      this.done = true;
    }
  }

  playVideo() {
    this.player.playVideo();
    this.isPlaying = true;
  }

  stopVideo() {
    this.player.stopVideo();
    this.isPlaying = false;
  }

  pauseVideo() {
    this.player.pauseVideo();
    this.isPlaying = false;
  }

  skipNext() {
    if (this.index < this.youglish.results.length-1) {
      this.index++;
      this.videoId = this.youglish.results[this.index].vid;
      this.playerVars.start = this.youglish.results[this.index].start;
      this.loadPlayer(this.videoId, this.playerVars.start);
    }
  }

  skipPrevious() {
    if (this.index > 0) {
      this.index --;
      this.videoId = this.youglish.results[this.index].vid;
      this.playerVars.start = this.youglish.results[this.index].start;
      this.loadPlayer(this.videoId, this.playerVars.start);
    }
  }

  goTo(indx) {
    if (indx >= 0 && indx < this.youglish.results.length) {
      this.index = indx;
      this.videoId = this.youglish.results[this.index].vid;
      this.playerVars.start = this.youglish.results[this.index].start;
      this.loadPlayer(this.videoId, this.playerVars.start);
    }
  }

  reload() {
    this.player.seekTo(this.playerVars.start, true);
  }

  get displayText() {
    if (this.youglish != undefined && this.youglish.results != undefined) {
      return this.youglish.results[this.index].display;
    }
    else {
      return '';
    }
  }

  youglishHasResults() {
    return this.youglish != undefined && this.youglish.results != undefined;
  }

}
