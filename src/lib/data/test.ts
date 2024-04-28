"use server";
import { dbQuery } from "../database/app";

export const testDb = async () => {
  console.log("@TEST START");
  try {
    const sql = "SHOW TABLES";
    const [rows, error] = await dbQuery(sql);
    if (error) {
      throw new Error("somethink went wrong");
    }
    console.log(rows);
    console.log("@TEST END @@ROW");
    return rows;
  } catch (error) {
    console.log("error ===", error);
    console.log("@TEST END @ERR");
    return "somethink went wrong";
  }
};
