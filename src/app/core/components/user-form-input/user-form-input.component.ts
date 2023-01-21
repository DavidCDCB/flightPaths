import { Component } from '@angular/core';
import { RequestsControllerService } from '../../services/RequestsController.service';
import { FlightDTO } from '../../models/FlightDTO';
import { Flight } from '../../models/Flight';

@Component({
  selector: 'app-user-form-input',
  templateUrl: './user-form-input.component.html',
  styleUrls: ['./user-form-input.component.css']
})
export class UserFormInputComponent {

  constructor(private flightsClient: RequestsControllerService<FlightDTO>){}

  private flights: FlightDTO[] = new Array<FlightDTO>;

  findPath(flights: FlightDTO[],nameOrigin: string | undefined, nameDestination: string): FlightDTO[]{
    let destination: Flight; 
    let path: FlightDTO[] = new Array<FlightDTO>;

    console.log(nameOrigin);
    for(let flight of flights){

      if(flight.arrivalStation === nameDestination){
        path.push(flight);
        console.log("--");
        console.log(flight);
        return path;
      }else if(flight.departureStation === nameOrigin){
        path = [...this.findPath(flights, flight.arrivalStation, nameDestination)];
        path.push(flight);
        console.log("++");
        console.log(flight);
        return path;
      }
    }
    return [];
  }

  getFlights(){
    
    this.flightsClient.getFlights().subscribe(
      (flights: FlightDTO[]) => {
        this.flights = flights;
        this.findPath(this.flights, "MZL", "BCN");
        console.log(this.flights);
      }
    );
  }

  ngOnInit(){
    console.log("iniciado");
    this.getFlights();
  }

}
