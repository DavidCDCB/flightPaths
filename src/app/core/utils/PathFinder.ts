import { Flight } from "../models/Flight";

export class PathFinder {

  static findPath(countFlight: number,flights: Flight[],nameOrigin: string | undefined, nameDestination: string): Flight[]{
    let path: Flight[] = new Array<Flight>;
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
