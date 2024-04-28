"use server";
import { dbQuery } from "../database/app";

export const testDb = async () => {
  try {
    const sql = "SHOW TABLES";
    const [rows, error] = await dbQuery(sql);
    if (error) {
      throw new Error("somethink went wrong");
    }
    console.log(rows);
    return rows;
  } catch (error) {
    return error;
  }
};
