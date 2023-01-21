import { Component } from '@angular/core';
import { RequestsControllerService } from '../../services/RequestsController.service';
import { FlightDTO } from '../../models/FlightDTO';

@Component({
  selector: 'app-user-form-input',
  templateUrl: './user-form-input.component.html',
  styleUrls: ['./user-form-input.component.css']
})
export class UserFormInputComponent {

  constructor(private flightsClient: RequestsControllerService<FlightDTO>){}

  getFlights(){
    
    this.flightsClient.getFlights().subscribe(
      (flights: FlightDTO[]) => {
        console.log(flights);
      }
    );
  }

  ngOnInit(){
    console.log("iniciado");
    this.getFlights();
  }

}
