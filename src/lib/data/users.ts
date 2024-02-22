import { connect } from "@planetscale/database";

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};
const conn = connect(config);

export const getUserById = async (id: string | number) => {
  try {
    const foundUser = await conn.execute(`SELECT * FROM users WHERE id = ?`, [
      id,
    ]);
    return foundUser;
  } catch (error) {
    console.log(error);
    return;
  }
};

interface newUser {
  id: number;
  image: string | null;
  email: string;
  last_name: string;
  first_name: string;
  name: string | null;
  account_id: string | null;
  password: string;
}

export const getUserByEmail = async (email: string) => {
  try {
    const foundUser = await conn.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email],
    );
    return foundUser.rows[0] as newUser;
  } catch (error) {
    console.log(error);
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
    console.log("first_name ===", first_name);
    console.log("last_name ===", last_name);
    console.log("email ===", email);
    console.log("password ===", password);
    const valuesToInsert = [first_name, last_name, email, password];
    const newUser = await conn.execute(
      `INSERT INTO users
            ( first_name, last_name, email, password) VALUES (?,?,?,?)`,
      valuesToInsert,
    );
    return newUser;
  } catch (error) {
    console.log("error ===", error);
    return;
  }
};
