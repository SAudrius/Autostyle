"use server";
import mysql from "mysql2/promise";

// import { dbConfigRemote } from "./config";

type QueryRes<T> = [T, null] | [null, Error];

export const dbQuery = async <T>(
  sql: string,
  valuesArr: (string | number | boolean)[] = [],
): Promise<QueryRes<T>> => {
  let conn;
  try {
    conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "3306"),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      ssl: {
        rejectUnauthorized: true,
      },
    });
    // eslint-disable-next-line no-unused-vars
    const [res, _fields] = await conn.execute(sql, valuesArr);
    return [res as T, null];
  } catch (err) {
    return [null, err as Error];
  } finally {
    if (conn) conn.end();
  }
};
