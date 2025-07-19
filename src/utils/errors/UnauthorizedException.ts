import { ApiException } from "./ApiException";

export class UnauthorizedException extends ApiException {
  constructor(message: string) {
    super({ status: 401, message });
  }
}
