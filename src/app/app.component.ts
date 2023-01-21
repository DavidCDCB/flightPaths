import { Component } from '@angular/core';
import { Flight } from './core/models/Flight';
import { Journey } from './core/models/Journey';
import { Transport } from './core/models/Transport';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PruebaTecnica';
  journey: Journey = new Journey();
  textResult?: string;
  totalPrice?: string;
  flightPath: Flight[] | undefined = new Array<Flight>;

  convertJourney(outputData: Journey): void{
    this.journey = outputData;
    this.journey.price = this.calculatePrice(this.journey.flights!);
    this.textResult = JSON.stringify(this.journey, null, 2);
  }

  calculatePrice(flights: Flight[]): string{
    let totalPrice = 0;
    this.flightPath = flights;

    if(this.flightPath !== undefined){
      for(let flight of this.flightPath!){
        totalPrice += parseInt(flight.price!);
      }
    }
    return totalPrice.toString();
  }

}
