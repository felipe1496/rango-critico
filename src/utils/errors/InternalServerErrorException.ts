import { ApiException } from "./ApiException";

export class InternalServerErrorException extends ApiException {
	constructor(message: string) {
		super({ status: 500, message });
	}
}
