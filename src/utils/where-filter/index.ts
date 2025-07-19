import { concat, isArray } from "lodash";
import { Condition, Operator } from "./Condition";

export type Where = ReturnType<typeof where>;

export const where = () => {
  const whereConditions: (Condition | Condition[])[] = [];

  const isOr = (strFilter: string) => {
    return strFilter.startsWith("(") && strFilter.endsWith(")");
  };
  const orderBy: { field: string; order: "asc" | "desc" }[] = [];
  let _page = 1;
  let _perPage = 201;
  let pagination = true;

  return {
    page(page: number) {
      _page = page;
      return this;
    },
    perPage(perPage: number) {
      _perPage = perPage;
      return this;
    },
    disablePagination() {
      pagination = false;
      return this;
    },
    orderBy(field: string, order: "asc" | "desc") {
      orderBy.push({ field, order });
      return this;
    },
    and(...[field, operator, value]: [string, Operator, unknown]) {
      whereConditions.push(new Condition(field, operator, value));
      return this;
    },
    or(conditions: [string, Operator, unknown][]) {
      whereConditions.push(
        conditions.map(([field, operator, value]) => {
          return new Condition(field, operator, value);
        })
      );
      return this;
    },
    addExpression(filterExpression?: string) {
      if (filterExpression) {
        const andSplitted = filterExpression.split(" and ");

        andSplitted.map((strFilter) => {
          if (isOr(strFilter)) {
            const orSplitted = strFilter
              .substring(1, strFilter.length - 1)
              .split(" or ");
            const orConditions: [string, Operator, unknown][] = [];
            orSplitted.forEach((orStrFilter) => {
              const result = orStrFilter.split(" ");
              orConditions.push([
                result[0],
                result[1] as Operator,
                result.slice(2).join(" "),
              ]);
            });
            this.or(orConditions);
          } else {
            const result = strFilter.split(" ");
            this.and(
              result[0],
              result[1] as Operator,
              result.slice(2).join(" ")
            );
          }
        });
      }
      return this;
    },
    build() {
      let where = "1 = 1";
      let values: unknown[] = [];

      for (const condition of whereConditions) {
        if (isArray(condition)) {
          where += ` AND (${condition
            .map((c) => {
              const [sql, value] = c.toSQL();
              if (isArray(value)) {
                values = concat(values, value);
              } else {
                values.push(value);
              }
              return sql;
            })
            .join(" OR ")})`;
        } else {
          const [sql, value] = condition.toSQL();
          where += ` AND ${sql}`;
          if (isArray(value)) {
            values = concat(values, value);
          } else {
            values.push(value);
          }
        }
      }

      if (orderBy.length) {
        where += ` ORDER BY ${orderBy
          .map((o) => `${o.field} ${o.order}`)
          .join(", ")}`;
      }

      if (pagination) {
        where += ` LIMIT ${_perPage} OFFSET ${(_page - 1) * _perPage}`;
      }

      return { sql: where, values };
    },
    buildWebFilter() {
      if (whereConditions.length === 0) {
        return null;
      }
      const conditions: string[] = [];
      for (const condition of whereConditions) {
        if (isArray(condition)) {
          const _conditions = condition.map((c) => c.getWebFilter());
          conditions.push(`(${_conditions.join(" or ")})`);
        } else {
          conditions.push(
            `${condition.field} ${condition.operator} ${condition.value}`
          );
        }
      }
      return conditions.join(" and ");
    },
  };
};
