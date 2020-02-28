import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";
import * as RecordRTC from 'recordrtc';
import adapter from 'webrtc-adapter';

@Component({
  selector: 'app-record-yourself',
  templateUrl: './record-yourself.component.html',
  styleUrls: ['./record-yourself.component.css']
})
export class RecordYourselfComponent implements OnInit, AfterViewInit {

  @Input('src') src: string;
  @Input('script') script: string;
  @Input('type') type: string;
  @ViewChild('video', {static: true})
  video: ElementRef;
  withVideo: boolean = true;
  recorder: RecordRTC.RecordRTC;
  stream: MediaStream;
  isRecording: boolean = false;
  audioDevices: {name: string, id: string}[] = [];
  audioDeviceId: string = '';
  url;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let video:HTMLVideoElement = this.video.nativeElement;

    video.muted = false;
    video.controls = true;
    video.autoplay = false;

    //this.displayCtx = this.displayCanvasEl.nativeElement.getContext('2d');

    //this.offCtx = this.offCanvasEl.getContext('2d');

    //this.captureCtx = this.captureCanvasEl.nativeElement.getContext('2d');
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        this.audioDevices = devices
          .filter(d => d.kind === 'audioinput')
          .map(d => {
            return {name: d.label, id: d.deviceId}
          });
        // FIXME: what if it doesn't exist?
        this.audioDeviceId = this.audioDevices[0].id;
      })
      .catch(err => {
        console.log(err.name + ": " + err.message);
      });
  }

  startRecording() {
      if (this.withVideo) {
        let constraints = {
          video: {
            facingMode: "user",
            width: {max: 720}
          },
          audio: {
            deviceId: { exact: this.audioDeviceId }
          },
        };

        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(
            this.successVideoCallback.bind(this),
            this.errorCallback.bind(this));

      } else {
        let constraints = {
          audio: {
            deviceId: { exact: this.audioDeviceId }
          },
        };

        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(
            this.successAudioCallback.bind(this),
            this.errorCallback.bind(this));
      }
  }

  successVideoCallback(stream: MediaStream) {
      this.stream = stream;

      let video: HTMLVideoElement = this.video.nativeElement;
      video.srcObject = stream;
      this.toggleControls();
      this.isRecording = true;
      console.log(this.isRecording);

      if (this.withVideo) {
        this.recorder = new RecordRTC.RecordRTCPromisesHandler(
          stream,
          {
            audio: true,
            video: true,
            bitsPerSecond: 128000
          });

        this.recorder.startRecording();
      }

    }

    successAudioCallback(stream: MediaStream) {
      this.stream = stream;

      this.toggleControls();

      this.recorder = new RecordRTC.RecordRTCPromisesHandler(
        stream,
        {
          audio: true,
          bitsPerSecond: 128000
        });

      this.recorder.startRecording();

    }

    errorCallback(error: MediaStreamError) {
      console.log(error);
    }

    toggleControls() {
      let video: HTMLVideoElement = this.video.nativeElement;

      video.muted = !video.muted;
      video.controls = !video.controls;
      video.autoplay = !video.autoplay;
    }

    stopRecording() {
      this.isRecording = false;
      this.recorder.stopRecording().then(() => {
        this.stream.getAudioTracks().forEach(track => track.stop());
        this.stream.getVideoTracks().forEach(track => track.stop());
        this.toggleControls();

        this.recorder.getBlob().then(blob => {
          // @Jarek: this is the final blob that should be uploaded to the
          // media-service
          RecordRTC.invokeSaveAsDialog(blob);
        });
      });
    }

    btnStopRecording() {
      this.isRecording = false;
      this.recorder.stopRecording().then(() => {
        this.stream.getAudioTracks().forEach(track => track.stop());
        this.stream.getVideoTracks().forEach(track => track.stop());
        this.toggleControls();

        this.recorder.getBlob().then(blob => {
          console.log(blob.size, blob);
          this.url = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
          URL.revokeObjectURL( this.url );
        });
      });
    }

}
