import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  chatHistory: any = [];
  constructor(private http: HttpClient) {

   }
   options() {
    // const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const authToken = '';
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: authToken,
    });
    const header = { headers };
    return header;
  }
  public handleError(error: HttpErrorResponse) {

    
  }

getques(payload: any): Observable<any> {
    return this.http
    .post(environment.HOST.backendUrl + '/qa/getques', payload, this.options());
   }

   suggestedans(payload: any): Observable<any> {
    return this.http
    .post(environment.HOST.backendUrl + '/qa/suggestedans', payload, this.options());
   }
}
