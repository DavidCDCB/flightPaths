import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {

  private urApi: string = 'https://currency-exchange.p.rapidapi.com/exchange';
  constructor(private http: HttpClient){}

  convertCurrency(from: string, to: string): Observable<string>{
    const headers= new HttpHeaders()
      .set('X-RapidAPI-Key', '8d2f313a48msh601880f56aefda7p1386eejsn9e539a3674a0')
      .set('X-RapidAPI-Host', 'currency-exchange.p.rapidapi.com');

    return this.http.get<string>(this.urApi, {
      'params': {to: to, from: from, q: '1.0'}, 
      'headers': headers 
    });
  }

}
