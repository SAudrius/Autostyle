import { connect } from "@planetscale/database";

import { googleUser } from "@/config/types";

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
    const valuesToInsert = [first_name, last_name, email, password];
    const newUser = await conn.execute(
      `INSERT INTO users
            ( first_name, last_name, email, password) VALUES (?,?,?,?)`,
      valuesToInsert,
    );
    return newUser;
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
    const valuesToInsert = [first_name, last_name, email, image];
    // creating new user for google without password
    await conn.execute(
      `INSERT INTO users
            ( first_name, last_name, email, image) VALUES (?,?,?,?)`,
      valuesToInsert,
    );
    const createdUser = await getUserByEmail(email);
    if (!createdUser) {
      return;
    }
    const accountValuesToInsert = [provider, createdUser.id];
    // creating account for provider
    await conn.execute(
      `INSERT INTO account (provider,user_id) VALUES (?,?)`,
      accountValuesToInsert,
    );
    return createdUser as googleUser;
  } catch (error) {
    return;
  }
};
