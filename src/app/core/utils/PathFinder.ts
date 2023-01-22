import { Flight } from "../models/Flight";

export class PathFinder {
	public static allPaths: string[] = new Array<string>;
	public static currentPath: string[] = new Array<string>;
	public static visitados: string[] = new Array<string>;

	static findBestPath(flights: Flight[],nameOrigin: string, nameDestination: string): Flight[] {
		let completePath: string = "";
		let origin = "";
		let fixPath = [];
		
		this.visitados.push(nameOrigin);
		this.findPaths(0, flights, nameOrigin, nameDestination);

		for(let p of this.allPaths){
			if(p.split("->")[0] === nameOrigin && p.split("->")[p.split("->").length-1] === nameDestination){
				completePath = p;
			}
		}
		
		if(completePath !== ""){
			for(let f of completePath.split(",").reverse()){
				console.log(f, origin);
				if(origin === "" || f.split("->")[1] === origin){
					origin = f.split("->")[0];
					fixPath.push(f);
				}
			}
		}

		console.log(completePath);
		console.log(fixPath);
		return (fixPath.length) ? this.collectFlights(flights, fixPath.reverse()) : [];
	}

	static findPaths(countFlight: number,flights: Flight[],nameOrigin: string | undefined, nameDestination: string) {
		if(countFlight < flights.length && this.currentPath.length < flights.length){
      for(let flight of flights){
				if(flight.departureStation === nameOrigin && flight.arrivalStation === nameDestination){
					this.checkFlight(nameOrigin, flight);
					if(!this.allPaths.includes(this.currentPath.toString())){
						this.allPaths.push(this.currentPath.toString());
					}
					this.currentPath.pop();
					break;
				}else if(flight.departureStation === nameOrigin && flight.arrivalStation !== nameDestination){
					countFlight++;
					this.checkFlight(nameOrigin, flight);
					this.findPaths(countFlight, flights, flight.arrivalStation, nameDestination);
				}
			}
		}
	}

	static collectFlights(flights: Flight[], fixPath: string[] ): Flight[]{
		let pathOfFligths: Flight[] = new Array<Flight>;
		for(let p of fixPath){
			let found: Flight | undefined = flights.find(x => (x.arrivalStation === p.split("->")[1] && x.departureStation === p.split("->")[0]));
			pathOfFligths.push(found!);
			console.log(found);
		}
		return pathOfFligths;
	}

	static checkFlight(nameOrigin: string | undefined,flight: Flight ){
		if(!this.currentPath.includes(`${nameOrigin}->${flight.arrivalStation}`) && !this.visitados.includes(flight.arrivalStation!)){
			this.currentPath.push(`${nameOrigin}->${flight.arrivalStation}`);
		}
		this.visitados.push(flight.arrivalStation!);
	}

	static simpleFindPath(countFlight: number,flights: Flight[],nameOrigin: string | undefined, nameDestination: string): Flight[]{
    let path: Flight[] = new Array<Flight>;
    if(countFlight < flights.length){
      for(let flight of flights){
        if(flight.departureStation === nameOrigin && flight.arrivalStation === nameDestination){
          path.push(flight);
          return path;
        }else if(flight.departureStation === nameOrigin && flight.arrivalStation !== nameDestination){
          countFlight++;
					path = [...this.simpleFindPath(countFlight, flights, flight.arrivalStation, nameDestination)];
          if(path.length > 0){
            path.push(flight);
          }
          return path;
        }
      }
    }
    return [];
  }
}
