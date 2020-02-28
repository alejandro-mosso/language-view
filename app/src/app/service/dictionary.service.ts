import { Injectable } from '@angular/core';
import { DictionaryModel } from '../model/dictionary.model';
import { RestClient } from './rest-client.service';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable()
export class DictionaryService {
  private context = '/define';

  constructor(private restClient: RestClient) {}

  public meaning(word: string) {
    const inParams = new URLSearchParams();
    inParams.append('word', word);
    return this.restClient.get(`${this.context}`, inParams)
      .pipe(
        tap(
          (response: DictionaryModel) => {
            /*response.forEach(entry => {});*/
          },
          (error) => {
            console.log('Dictionary service failed');
          }
        )
      );
  }
}
