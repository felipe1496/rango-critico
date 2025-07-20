import { ApiException } from "./ApiException";

export class NotFoundException extends ApiException {
	constructor(message: string) {
		super({ status: 404, message });
	}
}
