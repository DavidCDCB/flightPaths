import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsControllerService<T> {

  private urApi: string = environment.apiURL;
  constructor(private http: HttpClient){}

  getFlights(): Observable<Array<T>>{
    return this.http.get<Array<T>>(this.urApi);
  }

}
