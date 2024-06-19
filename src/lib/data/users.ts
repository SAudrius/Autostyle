import { ResultSetHeader } from "mysql2";

import { dbQuery } from "../database/app";

export const getUserById = async (id: string | number) => {
  try {
    const dbParams = [id];
    const sql = "SELECT * FROM users WHERE id = ?";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [rows, error] = await dbQuery<User>(sql, dbParams);
    if (error) {
      throw new Error("somethink went wrong");
    }
  } catch (error) {
    return;
  }
};


export const getUserByEmail = async (email: string) => {
  try {
    const dbParams = [email];
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows, error] = await dbQuery<User[]>(sql, dbParams);
    if (error) {
      throw new Error("somethink went wrong");
    }
    // console.log(rows);
    return rows[0];
  } catch (error) {
    return;
  }
};


export const getUserDetailsById = async (id: number | string) => {
  try {
    const sql =
      "SELECT first_name, last_name, email, country, address FROM users WHERE id = ?";
    const dbParams = [id];
    const [rows, error] = await dbQuery<UserDetailsApi[]>(sql, dbParams);
    console.log("rows ===", rows);
    if (error) {
      throw new Error("somethink went wrong");
    }
    return rows[0];
  } catch (error) {
    return;
  }
};


export const createUserByData = async (
  first_name: string,
  last_name: string,
  email: string,
  password: string,
) => {
  try {
    const dbParams = [first_name, last_name, email, password];
    const sql =
      "INSERT INTO users ( first_name, last_name, email, password) VALUES (?,?,?,?)";
    const [rows, error] = await dbQuery<ResultSetHeader>(sql, dbParams);
    if (error) {
      throw new Error("somethink went wrong");
    }
    return rows;
  } catch (error) {
    return;
  }
};

export const createGoogleUserByData = async (
  first_name: string,
  last_name: string,
  email: string,
  image: string,
) => {
  try {
    const provider = "google";
    const sql =
      "INSERT INTO users ( first_name, last_name, email, image) VALUES (?,?,?,?)";
    const dbParams = [first_name, last_name, email, image];
    // creating new user for google without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [rows, error] = await dbQuery(sql, dbParams);
    if (error) {
      throw new Error("somethink went wrong");
    }
    const createdUser = await getUserByEmail(email);
    if (!createdUser) {
      return;
    }
    // creating account for provider
    const sql2 = "INSERT INTO accounts (provider,user_id) VALUES (?,?)";
    const dbParams2 = [provider, createdUser.id];
    const [rows2, error2] = await dbQuery<ResultSetHeader>(sql2, dbParams2);
    // console.log("rows2 ===", rows2);
    if (error2) {
      // console.log("error2 ===", error2);
      throw new Error("somethink went wrong");
    }
    if (rows2.affectedRows !== 1) {
      return;
    }
    return rows2;
  } catch (error) {
    return;
  }
};

export const updateUserEmailVerifiedById = async (id: number) => {
  try {
    const sql =
      "UPDATE users SET email_verified = 1 WHERE id = ?";
    const dbParams = [id];
    const [rows, error] = await dbQuery<ResultSetHeader>(sql, dbParams);
    if (error) {
      throw new Error("somethink went wrong");
    }
    return rows;
  } catch (error) {
    return;
  }
}