import { Component } from '@angular/core';
import { RequestsControllerService } from '../../services/RequestsController.service';

@Component({
  selector: 'app-user-form-input',
  templateUrl: './user-form-input.component.html',
  styleUrls: ['./user-form-input.component.css']
})
export class UserFormInputComponent {

  constructor(private flightsClient: RequestsControllerService){}

  getFlights(){
    this.flightsClient.getFlights().subscribe(
      data => {
        console.log(data);
      }
    );
  }

  ngOnInit(){
    console.log("iniciado");
    this.getFlights();
  }

}
