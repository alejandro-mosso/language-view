import { Injectable } from '@angular/core';
import { HistoryMenuModel } from '../model/history-menu.model';
import { RestClient } from './rest-client.service';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable()
export class HistoryMenuService {
  private context = '/languagelab/history-menu';

  constructor(private restClient: RestClient) {}

  public getHistories(src, tar) {
    const inParams = new URLSearchParams();
    inParams.append('src', src);
    inParams.append('tar', tar);
    return this.restClient.get(`${this.context}/language`, inParams)
      .pipe(
        tap(
          (response: Array<HistoryMenuModel>) => {
            /*response.forEach(entry => {});*/
          },
          (error) => {
            console.log('HistoryMenuService service failed');
          }
        )
      );
  }

  public getHistoryByTitle(title) {
      const inParams = new URLSearchParams();
      inParams.append('title', title);
      return this.restClient.get(`${this.context}`, inParams)
        .pipe(
          tap(
            (response: Array<HistoryMenuModel>) => {
              /*response.forEach(entry => {});*/
            },
            (error) => {
              console.log('HistoryMenuService service failed');
            }
          )
        );
    }
}
