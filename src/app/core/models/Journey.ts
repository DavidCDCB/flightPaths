import { Flight } from "./Flight";

export class Journey {
	public origin: string | undefined;
	public destination: string | undefined;
	public price: string | undefined;
	public flights: Flight[] | undefined;
}
