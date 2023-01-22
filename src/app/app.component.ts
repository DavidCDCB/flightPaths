import { Component } from '@angular/core';
import { Flight } from './core/models/Flight';
import { Journey } from './core/models/Journey';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public textResult?: string;
  public journey: Journey = new Journey();
  public flightPath?: Flight[] = new Array<Flight>;

  completeJourney(outputData: Journey): void{
    this.journey = outputData;
    this.journey.price = this.calculateTotalPrice(this.journey.flights!);

    const objJourney = {
      Journey:this.journey
    }
    this.textResult = JSON.stringify(objJourney, null, 4);
  }

  calculateTotalPrice(flights: Flight[]): string{
    let totalPrice = 0;
    this.flightPath = flights;

    if(this.flightPath){
      for(let flight of this.flightPath!){
        totalPrice += parseInt(flight.price!);
      }
    }
    return totalPrice.toString();
  }

}
