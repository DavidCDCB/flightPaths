import { Transport } from "./Transport";

export class Flight {
	private arrivalStation: string | undefined;
	private departureStation: string | undefined;
	private price: string | undefined;
	private transport: Transport[] | undefined;
}
