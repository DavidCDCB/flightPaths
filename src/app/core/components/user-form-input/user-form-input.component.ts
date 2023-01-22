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
  private sites?: (string | undefined)[] = new Array<string>;
  public registerForm!: FormGroup;
  public equals = false;
  public validInputs = false;

  @Output() 
  public emitOutput = new EventEmitter<Journey>();

  public requestData = {
    origen: "MEX",
    destino: "BCN"
  };

  constructor(
    private flightsHTTPClient: RequestsControllerService<FlightDTO>, 
    private formBuilder: FormBuilder
  ){}

  get f() { return this.registerForm.controls; }

  /**
   * Cuando el componente inicia se obtienen todos los vuelos disponibles por parte de la API
   * y se definen las reglas procipales de validación del formulario reactivo.
   */
  ngOnInit(){
    this.getFlights();
    this.registerForm = this.formBuilder.group({
        origen: ['', [Validators.required, Validators.pattern("[A-Z]{3}")]],
        destino: ['', [Validators.required, Validators.pattern("[A-Z]{3}")]],
    });
  }

  /**
   * Si la pretición a la API de realiza correctamente se obtienen todos los vuelos y tambien
   * el listado de todos los lugares disponibles.
   */
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

  /**
   * Se usa el objeto DTO para crear la estructura de datos que va a tener la información según
   * los requerimientos.
   * @param {FlightDTO[]} flights :Listado de vuelos disponibles
   * @returns 
   */
  modelFlightOfDTO(flights: FlightDTO[]): Flight[]{
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

  /**
   * Proceso que usa el algoritmo de busqueda recursiva para hallar la ruta de vuelo adecuada
   */
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

  /**
   * Verifica si el sitio elegido como origen o destino se encuentra disponible de acuerdo a la
   * información por parte de la API.
   * @param {string} site : Lugar de origen o destino
   * @returns {boolean} : Si el sitio se encuentra disponible o no
   */
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

  /**
   * Verifica si los campos ingresado cumplen con los requisitos de validación del formulario
   * reactivo y por cada cmabio en ellos pasa de minusculas a mayusculas.
   */
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

  createJourney(skyway: Flight[]): Journey{
    return {
      origin: this.f['origen'].value,
      destination: this.f['destino'].value,
      price: "",
      flights: skyway
    }
  }

  existFlights(): boolean{
    return this.flights.length > 1;
  }
  
  showPopUpError(){
    Swal.fire({
      icon: 'error',
      title: 'Espera',
      text: 'No se ha encontrado una ruta de vuelo disponible para estos lugares',
    })
  }

}
