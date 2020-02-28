import { Injectable } from '@angular/core';
import { AudioModel } from '../model/audio.model';
import { RestClient } from './rest-client.service';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable()
export class AudioService {
  private context = '/audio';

  constructor(private restClient: RestClient) {}

  public getAudio(word, language) {
    const inParams = new URLSearchParams();
    inParams.append('word', word);
    inParams.append('language', language);
    return this.restClient.get(`${this.context}`, inParams)
      .pipe(
        tap(
          (response: AudioModel) => {
            /*response.forEach(entry => {});*/
          },
          (error) => {
            console.log('Audio service failed');
          }
        )
      );
  }
}
