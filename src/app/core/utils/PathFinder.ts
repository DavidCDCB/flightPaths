import { Flight } from "../models/Flight";

export class PathFinder {
	public static allPaths: string[];
	public static currentPath: string[];
	public static visited: string[];

	/**
	 * Proceso encargado de hallar la mejor de las rutas encontradas de vuelo de acuerdo 
	 * a su correcto origen, destino y concordancia.
	 * @param {Flight[]} flights : Listado de todos los vuelos disponibles por parte del servicio API
	 * @param {string} nameOrigin : Nombre del origen especificado
	 * @param {string} nameDestination : Nombre del destino usado para hallar las rutas validas
	 * @returns {Flight[]} : Lista de la ruta representada por un listado de objetos de tipo Flight
	 */
	static findBestPath(flights: Flight[],nameOrigin: string, nameDestination: string): Flight[] {
		let completePath: string = "";
		let origin = "";
		let fixPath = [];

		this.allPaths = new Array<string>;
		this.currentPath = new Array<string>;
		this.visited = new Array<string>;
		
		this.visited.push(nameOrigin);
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

	/**
	 * Proceso recursivo que usa estructuras de datos globales para recorrer el grafo de rutas
	 * de vuelos y de esta forma encontrar todas las rutas posibles partiendo de un origen a un
	 * destino determinado usando cadenas string para representar las conexiones.
	 * @param {number} countFlight : Conteo de vuelos encontrados por cada ruta
	 * @param {Flight[]} flights : : Listado de todos los vuelos disponibles por parte del servicio API
	 * @param {string} nameOrigin : Nombre del origen especificado
	 * @param {string} nameDestination : Nombre del destino usado para hallar las rutas validas
	 */
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

	/**
	 * Recolecta todos los objetos de tipo Flight de acuerdo la lista de conexiones que indica 
	 * la ruta encontrada
	 * @param {Flight[]} flights : Listado de todos los vuelos disponibles por parte del servicio API
	 * @param {string[]} fixPath : Listado de conexiones válidas
   * @returns {Flight[]} : Lista de la ruta representada por un listado de objetos de tipo Flight
	 */
	static collectFlights(flights: Flight[], fixPath: string[] ): Flight[]{
		let pathOfFligths: Flight[] = new Array<Flight>;
		for(let p of fixPath){
			let found: Flight | undefined = flights.find(x => (x.arrivalStation === p.split("->")[1] && x.departureStation === p.split("->")[0]));
			pathOfFligths.push(found!);
			console.log(found);
		}
		return pathOfFligths;
	}

	/**
	 * Verifica la validez del vuelo encontrado con el fin de evitar los ciclos infinitos en el
	 * proceso recursivo
	 * @param {string} nameOrigin : Nombre del origen especificado
	 * @param {Flight} flight : Vuelo determido al que se le verifica si el destino ya fue visitado
	 */
	static checkFlight(nameOrigin: string | undefined, flight: Flight ): void{
		if(!this.currentPath.includes(`${nameOrigin}->${flight.arrivalStation}`) && !this.visited.includes(flight.arrivalStation!)){
			this.currentPath.push(`${nameOrigin}->${flight.arrivalStation}`);
		}
		this.visited.push(flight.arrivalStation!);
	}

	/**
	 * Proceso de busqueda recursiva que solo aplica para grafos sin ciclos y con rutas únicas
	 */
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
