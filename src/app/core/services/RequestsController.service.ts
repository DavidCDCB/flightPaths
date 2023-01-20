import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsControllerService {

  private urApi: string = environment.apiURL;
  constructor(private http: HttpClient){}

  getFlights(){
    return this.http.get(this.urApi);
  }

}
