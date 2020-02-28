import { Injectable } from '@angular/core';
import { TranslateModel } from '../model/translate.model';
import { RestClient } from './rest-client.service';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable()
export class TranslateService {
  private context = '/translate';

  constructor(private restClient: RestClient) {}

  public translate(text: string, src: string, dest: string) {
      const inParams = new URLSearchParams();
      inParams.append('text', text);
      inParams.append('src', src);
      inParams.append('dest', dest);
      return this.restClient.get(`${this.context}`, inParams)
        .pipe(
          tap(
            (response: TranslateModel) => {
              /*response.forEach(entry => {});*/
            },
            (error) => {
              console.log('Translation service failed');
            }
          )
        );
    }
}
