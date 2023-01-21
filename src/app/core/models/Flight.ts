import { Transport } from "./Transport";

export class Flight {
	public arrivalStation: string | undefined;
	public departureStation: string | undefined;
	public price: string | undefined;
	public transport: Transport[] | undefined;
}
