import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

export class Authorization {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  jti: string;
}

@Injectable()
export class RestClient {

  authorization: Authorization;
  headers: HttpHeaders;

  constructor(public http: HttpClient) {
  }

  genHeaders(type: string, auth?: boolean) {
    this.headers = null;
    this.headers = new HttpHeaders();

    if (type !== null && type !== undefined) {
      if (type === 'json') {
        this.headers = this.headers.append('Content-Type', 'application/json');
      } else if (type === 'form') {
        this.headers = this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
      }
      if (auth === undefined ? true : auth) { // won't enter if auth = false
        this.createAuthorizationHeader();
      }
    }

    return this.headers;
  }

  createAuthorizationHeader() {
    this.headers = this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('csitbmid'));
  }

  login(username: string, password: string) {
    const body = new URLSearchParams();
    // body.append('grant_type', environment.grantType);
    body.append('username', username);
    body.append('password', password);

    return this.http.post(`${environment.baseUrl}/oauth/token`, body.toString(), { headers: this.genHeaders(null) })
      .pipe(
        tap(
          (data) => {
            this.authorization = JSON.parse(JSON.stringify(data));
          },
          (error: HttpErrorResponse) => {
            this.filterUnauthorized(error);
          })
      );
  }

  get(url: string, query: URLSearchParams) {
    let path = `${environment.baseUrl}${url}`;
    if (query !== null && query !== undefined) {
      path = `${path}?${query.toString()}`;
    }
    return this.http.get(path, { headers: this.genHeaders('none')})
      .pipe(
        tap(
          (data) => {},
          (error: HttpErrorResponse) => {
            this.filterUnauthorized(error);
          }
        )
      );
  }

  put(url: string, body: string) {
    return this.http.put(`${environment.baseUrl}${url}`, body, { headers: this.genHeaders('json')})
      .pipe(
        tap(
          (data) => {},
          (error: HttpErrorResponse) => {
            this.filterUnauthorized(error);
          }
        )
      );
  }

  post(url: string, body: string) {
    return this.http.post(`${environment.baseUrl}${url}`, body, { headers: this.genHeaders('json')})
      .pipe(
        tap(
          (data) => {},
          (error: HttpErrorResponse) => {
            this.filterUnauthorized(error);
          }
        )
      );
  }

  delete(url: string, query: URLSearchParams) {
    let path = `${environment.baseUrl}${url}`;
    if (query !== null && query !== undefined) {
      path = `${path}?${query.toString()}`;
    }
    return this.http.delete(path, { headers: this.genHeaders(null) })
      .pipe(
        tap(
          (data) => {},
          (error: HttpErrorResponse) => {
            this.filterUnauthorized(error);
          }
        )
      );
  }

  filterUnauthorized(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      if (error.status === 401) {
        window.location.href = `${environment.loginHomePage}`;
      } else if (error.status === 403) {
        console.log('Forbidden');
        // todo: show snack to notify forbidden access
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
    }
  }

}
