import { clone, isArray, isString } from "lodash";
import { BadRequestException } from "../errors/BadRequestException";

const operators = {
  eq: "=",
  gt: ">",
  lt: "<",
  ge: ">=",
  le: "<=",
  ne: "<>",
  like: "LIKE",
  nlike: "NOT LIKE",
  st: "LIKE",
  nst: "NOT LIKE",
  ew: "LIKE",
  new: "NOT LIKE",
  in: "IN",
  nin: "NOT IN",
  is: "IS",
  nis: "IS NOT",
};

export type Operator = keyof typeof operators;

export class Condition {
  constructor(
    public readonly field: string,
    public readonly operator: Operator,
    public readonly value: unknown
  ) {
    if (!operators[this.operator]) {
      throw new BadRequestException(`Invalid operator: ${this.operator}`);
    }
  }

  private escapeStrValue(strValue: unknown) {
    let newValue = clone(strValue);
    if (
      isString(strValue) &&
      strValue.startsWith("'") &&
      strValue.endsWith("'")
    ) {
      newValue = strValue.substring(1, strValue.length - 1);
    }
    return newValue;
  }

  private getOperator() {
    return operators[this.operator];
  }

  toSQL() {
    switch (this.operator) {
      case "in":
      case "nin": {
        if (!isArray(this.value)) {
          throw new BadRequestException(
            `Value of ${this.field} must be an array`
          );
        }
        return [
          `"${this.field}" ${this.getOperator()} (${this.value
            .map(() => "?")
            .join(", ")})`,
          this.value,
        ];
      }
      case "like": {
        return [
          `upper("${this.field}") ${this.getOperator()} upper(?)`,
          `%${this.escapeStrValue(this.value)}%`,
        ];
      }
      case "st": {
        return [
          `upper("${this.field}") ${this.getOperator()} upper(?)`,
          `${this.escapeStrValue(this.value)}%`,
        ];
      }
      case "ew": {
        return [
          `upper("${this.field}") ${this.getOperator()} upper(?)`,
          `%${this.escapeStrValue(this.value)}`,
        ];
      }
      default:
        return [
          `"${this.field}" ${this.getOperator()} ?`,
          this.escapeStrValue(this.value),
        ];
    }
  }

  getWebFilter() {
    let value = clone(this.value);
    if (isArray(value)) {
      value = `(${value.join(",")})`;
    }
    return `${this.field} ${this.operator} ${value}`;
  }
}
