import { Component, EventEmitter, Output } from '@angular/core';
import { RequestsControllerService } from '../../services/RequestsController.service';
import { FlightDTO } from '../../models/FlightDTO';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { PathFinder } from '../../utils/PathFinder';
import { Flight } from '../../models/Flight';
import { Journey } from '../../models/Journey';
import Swal from 'sweetalert2';

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
  private sites?: (string | undefined)[] = new Array<string>;

  @Output() 
  public emitOutput = new EventEmitter<Journey>();

  public requestData = {
    origen: "",
    destino: ""
  };

  constructor(
    private flightsHTTPClient: RequestsControllerService<FlightDTO>, 
    private formBuilder: FormBuilder
  ){}

  ngOnInit(){
    this.getFlights();

    this.registerForm = this.formBuilder.group({
        origen: ['MEX', [Validators.required, Validators.pattern("[A-Z]{3}")]],
        destino: ['BCN', [Validators.required, Validators.pattern("[A-Z]{3}")]],
    });
  }

  get f() { return this.registerForm.controls; }

  getFlights(){
    this.flightsHTTPClient.getFlights().subscribe(
      (flights: FlightDTO[]) => {
        console.log(flights);
        this.flights = this.modelFlightOfDTO(flights);
        this.sites = [...this.flights.map((f) => f.arrivalStation),...this.flights.map((f) => f.departureStation)];
        console.log(this.sites);
      }
    );
  }

  modelFlightOfDTO(flights: FlightDTO[]){
    return flights.map((x: FlightDTO): Flight => {
      return {
        arrivalStation: x.arrivalStation,
        departureStation: x.departureStation,
        price: x.price,
        transport: {
          flightCarrier: x.flightCarrier,
          flightNumber: x.flightNumber
        }
      }
    });
  }

  showPopUpError(){
    Swal.fire({
      icon: 'error',
      title: 'Espera',
      text: 'No se ha encontrado una ruta de vuelo disponible para estos lugares',
    })
  }

  createSkyway(){
    this.requestData = this.registerForm.value;
    let skyway = PathFinder.findBestPath(this.flights, this.requestData.origen, this.requestData.destino);
    console.log(skyway);
    if(skyway.length){
      this.emitOutput.emit(this.createJourney(skyway));
    }else{
      this.showPopUpError();
    }
  }

  createJourney(skyway: Flight[]): Journey{
    return {
      origin: this.f['origen'].value,
      destination: this.f['destino'].value,
      price: "",
      flights: skyway
    }
  }

  checkSite(site: string): boolean{
    if(site.length == 3){
      if(this.sites?.includes(site)){
        return false;
      }else{
        this.validInputs = false;
        return true;
      }
    }
    return false;
  }

  checkInputs(){
    this.changeToUpperCase();
    this.equals = this.f['origen'].value === this.f['destino'].value;
    this.validInputs = !(this.equals || this.f['origen'].errors || this.f['destino'].errors );
  }

  changeToUpperCase(){
    this.f['origen'].setValue(this.f['origen'].value.toUpperCase());
    this.f['destino'].setValue(this.f['destino'].value.toUpperCase());
  }

  checkInvalidInput(element: any){
    return (element.errors && !element.pristine);
  }

}
