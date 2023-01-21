import { Flight } from "./Flight";

export class Journey {
	private origin: string | undefined;
	private destination: string | undefined;
	private price: string | undefined;
	private flights: Flight[] | undefined;
}
