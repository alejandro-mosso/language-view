import { Injectable } from '@angular/core';
import { YouglishModel } from '../model/youglish.model';
import { RestClient } from './rest-client.service';
import { tap } from 'rxjs/internal/operators/tap';


@Injectable()
export class YouglishService {
  private context = '/youglish';

  constructor(private restClient: RestClient) {}

  public findVideos(text: string, language: string) {
    const inParams = new URLSearchParams();
    inParams.append('text', text);
    inParams.append('language', language);
    return this.restClient.get(`${this.context}`, inParams)
      .pipe(
        tap(
          (response: YouglishModel) => {
            /*response.forEach(entry => {});*/
          },
          (error) => {
            console.log('Youglish service failed');
          }
        )
      );
  }
}
