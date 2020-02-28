import { Injectable } from '@angular/core';
import { IMediaModel } from '../model/i-media.model';
import { RestClient } from './rest-client.service';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable()
export class IMediaService {
  private context = '/languagelab/i-media';

  constructor(private restClient: RestClient) {}

  public getByHistoryId2(id) {
    const inParams = new URLSearchParams();
    inParams.append('id', id);
    return this.restClient.get(`${this.context}/history`, inParams)
      .pipe(
        tap(
          (response: Array<IMediaModel>) => {
            /*response.forEach(entry => {});*/
          },
          (error) => {
            console.log('IMediaService service failed');
          }
        )
      );
  }
}
