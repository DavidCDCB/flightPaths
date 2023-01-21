import { Component } from '@angular/core';
import { RequestsControllerService } from '../../services/RequestsController.service';
import { FlightDTO } from '../../models/FlightDTO';
import { NgModel, ReactiveFormsModule, FormBuilder, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-user-form-input',
  templateUrl: './user-form-input.component.html',
  styleUrls: ['./user-form-input.component.css']
})
export class UserFormInputComponent {

  private flights: FlightDTO[] = new Array<FlightDTO>;
  public registerForm!: FormGroup;
  public invalid = false;

  public requestData = {
    origen: "MZL",
    destino: "BCN"
  };

  constructor(private flightsClient: RequestsControllerService<FlightDTO>, private formBuilder: FormBuilder){}

  ngOnInit(){
    console.log("iniciado");
    this.getFlights();

    this.registerForm = this.formBuilder.group({
        origen: ['MZL', [Validators.required, Validators.pattern("[A-Z]{3}")]],
        destino: ['BCN', [Validators.required, Validators.pattern("[A-Z]{3}")]],
    });
  }

  get f() { return this.registerForm.controls; }

  getFlights(){
    this.flightsClient.getFlights().subscribe(
      (flights: FlightDTO[]) => {
        this.flights = flights;
        console.log(this.flights);
      }
    );
  }

  createSkyway(){
    this.requestData = this.registerForm.value;
    let skyway = this.findPath(0, this.flights, this.requestData.origen, this.requestData.destino);
    console.log(skyway);
  }

  checkInputEmpty(element: any){
    return element.errors && !element.pristine;
  }
  
  checkInput(){
    this.f['origen'].setValue(this.f['origen'].value.toUpperCase());
    this.f['destino'].setValue(this.f['destino'].value.toUpperCase());
    this.invalid = this.f['origen'].value === this.f['destino'].value;
  }

  findPath(countFlight: number,flights: FlightDTO[],nameOrigin: string | undefined, nameDestination: string): FlightDTO[]{
    let path: FlightDTO[] = new Array<FlightDTO>;
    countFlight++
    if(countFlight < flights.length){
      for(let flight of flights){
        console.log(flight);
        if(flight.departureStation === nameOrigin && flight.arrivalStation === nameDestination){
          path.push(flight);
          console.log("--");
          return path;
        }else if(flight.departureStation === nameOrigin && flight.arrivalStation !== nameDestination){
          path = [...this.findPath(countFlight++, flights, flight.arrivalStation, nameDestination)];
          if(path.length > 0){
            path.push(flight);
          }
          console.log("++");
          return path;
        }
      }
    }
    return [];
  }

}
