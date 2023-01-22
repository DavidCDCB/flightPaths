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

  /**
   * Se estructura el objeto JSON que representa el journey, con el valor total del precio
   * con el fin de ser agregado al componente que muestra el resultado en modo texto
   * @param {Journey} outputData : Objeto de tipo Journey que proviene del componente de formulario
   */
  completeJourney(outputData: Journey): void{
    this.journey = outputData;
    this.journey.price = this.calculateTotalPrice(this.journey.flights!);

    const objJourney = {
      Journey:this.journey
    }
    this.textResult = JSON.stringify(objJourney, null, 4);
  }

  /**
   * Calcula el valor total del precio de la ruta de vuelo encontrada
   * para completar el Objeto JSON que representa el resultado
   * @param {Flight[]} flights : Listado con los objetos de tipo Flight que representan la ruta encontrada
   * @returns {string} : El precio total en texto
   */
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
