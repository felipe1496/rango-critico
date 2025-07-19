import { HTTP_STATUS } from "@/constants/httpStatus";

export class ApiException extends Error {
  status: number = 500;
  error: string;
  constructor({
    status = 500,
    message = "Unkown error",
  }: {
    status: number;
    message: string;
  }) {
    super(message);
    this.name = "ApiException";
    this.status = status;
    this.error = HTTP_STATUS[this.status];
  }
}
