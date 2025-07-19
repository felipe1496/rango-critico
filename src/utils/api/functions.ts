/* eslint-disable @typescript-eslint/no-explicit-any */
import { keys, values as v } from "lodash";
import { Pool, PoolClient } from "pg";
import { Ok } from "../types";
import { Where } from "../where-filter";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
});

export const replacePlaceholders = (query: string) => {
  let index = 0;
  let insideQuotes = false;

  return query.replace(/(\?|['"])/g, (match) => {
    if (match === `'` || match === `"`) {
      insideQuotes = !insideQuotes; // Alterna se está dentro de aspas
      return match; // Retorna o caractere de aspas sem modificação
    }

    if (!insideQuotes && match === `?`) {
      return `$${++index}`; // Substitui apenas os placeholders fora de aspas
    }

    return match; // Retorna o `?` como está, se estiver entre aspas
  });
};

export async function query<T = unknown>(
  sql: string,
  params: any[] = [],
  db?: PoolClient
): Promise<Ok<T[]>> {
  const client = db || (await pool.connect());
  return new Promise((resolve) => {
    client.query(replacePlaceholders(sql), params, (err, res) => {
      const paramsString = params
        ? " | with params: [" +
          params.map((param) => JSON.stringify(param)).join(", ") +
          "]"
        : "";
      if (err) {
        console.error("Error running query: " + sql + paramsString, err);
        resolve({ ok: false, err });
      } else {
        console.log("Query executed: " + sql + paramsString);
        resolve({ ok: true, data: res.rows as T[] });
      }
      if (!db) {
        client.release();
      }
    });
  });
}

export function insert<T extends object, K = unknown>(table: string) {
  return (params: T, db?: PoolClient) => {
    const fields = keys(params);
    const values = v(params);

    return query<K>(
      `INSERT INTO ${table} (${fields.join(", ")}) VALUES (${values
        .map(() => "?")
        .join(", ")}) RETURNING *;`,
      values,
      db
    );
  };
}

export function select<T = unknown>(table: string) {
  return async (where?: Where) => {
    let sql = `SELECT * FROM ${table}`;
    if (where) {
      sql += " WHERE " + where.build().sql;
    }
    sql += ";";
    const res = await query<T>(sql, where ? where.build().values : []);
    return res;
  };
}

export function update<T extends object, K = unknown>(table: string) {
  return async (params: T, where?: Where, db?: PoolClient) => {
    let sql = `UPDATE ${table}`;
    const set = keys(params).map((key) => `${key} = ?`);
    sql += " SET " + set.join(", ");
    if (where) {
      sql += " WHERE " + where.build().sql;
    }
    sql += " RETURNING *;";
    const _params = [...v(params), ...(where ? where.build().values : [])];
    console.log(sql, _params);
    return query<K>(sql, _params, db);
  };
}

export function $delete(table: string) {
  return async (where?: Where, db?: PoolClient) => {
    let sql = `DELETE FROM ${table}`;
    if (where) {
      sql += " WHERE " + where.build().sql;
    }
    sql += ";";
    const res = await query(sql, where ? where.build().values : [], db);
    return res;
  };
}
