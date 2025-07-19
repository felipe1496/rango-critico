import { ApiException } from "./ApiException";

export class ForbiddenException extends ApiException {
  constructor(message: string) {
    super({ status: 403, message });
  }
}
