import { ApiException } from "./ApiException";

export class ConflictException extends ApiException {
	constructor(message: string) {
		super({ status: 409, message });
	}
}
