import { ApiException } from "./ApiException";

export class BadRequestException extends ApiException {
	constructor(message: string) {
		super({ status: 400, message });
	}
}
