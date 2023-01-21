import { Component, EventEmitter, Output } from '@angular/core';
import { RequestsControllerService } from '../../services/RequestsController.service';
import { CurrencyConverterService } from '../../services/CurrencyConverter.service';
import { FlightDTO } from '../../models/FlightDTO';
import { NgModel, ReactiveFormsModule, FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { PathFinder } from '../../utils/PathFinder';
import { Flight } from '../../models/Flight';
import { Transport } from '../../models/Transport';
import { Journey } from '../../models/Journey';


@Component({
  selector: 'app-user-form-input',
  templateUrl: './user-form-input.component.html',
  styleUrls: ['./user-form-input.component.css']
})
export class UserFormInputComponent {

  private flights: Flight[] = new Array<Flight>;
  public registerForm!: FormGroup;
  public equals = false;
  public validInputs = false;
  public textOutput: string = "";

  @Output() 
  public emitOutput = new EventEmitter<Journey>();

  public requestData = {
    origen: "MZL",
    destino: "BCN"
  };

  constructor(
    private flightsClient: RequestsControllerService<FlightDTO>, 
    private formBuilder: FormBuilder
  ){}

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
        this.flights = flights.map((x: FlightDTO): Flight => {
          return {
            arrivalStation: x.arrivalStation,
            departureStation: x.departureStation,
            price: x.price,
            transport: [
              {
                flightCarrier: x.flightCarrier,
                flightNumber: x.flightNumber
              }
            ]
          }
        });
        console.log(this.flights);
      }
    );
  }

  createSkyway(){
    this.requestData = this.registerForm.value;
    let skyway = PathFinder.findPath(0, this.flights, this.requestData.origen, this.requestData.destino);
    console.log(skyway);
    this.emitOutput.emit(this.createJourney(skyway));
  }

  createJourney(skyway: Flight[]): Journey{
    return {
      origin: this.f['origen'].value,
      destination: this.f['destino'].value,
      price: "",
      flights: skyway
    }
  }

  changeToUpperCase(){
    this.f['origen'].setValue(this.f['origen'].value.toUpperCase());
    this.f['destino'].setValue(this.f['destino'].value.toUpperCase());
  }

  checkInvalidInput(element: any){
    return (element.errors && !element.pristine);
  }
  
  checkInput(){
    this.changeToUpperCase();
    this.equals = this.f['origen'].value === this.f['destino'].value;
    this.validInputs = !(this.equals || this.f['origen'].errors || this.f['destino'].errors );
  }

}
