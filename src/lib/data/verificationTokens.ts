import { dbQuery } from "@lib/database/app";
import { ResultSetHeader } from "mysql2";

export const createVerificationTokenByEmail = async (email: string,token: string) => {
    try {
      const sql =
        "INSERT INTO verification_tokens (email, token) VALUES (?,?)";
      const dbParams = [email, token];
      const [rows, error] = await dbQuery<ResultSetHeader>(sql, dbParams);
      if (error) {
        throw new Error("somethink went wrong");
      }

      return rows;
    } catch (error) {
      return;
    }
};

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const sql =
        "SELECT verification_tokens WHERE email = ? VALUES (?)";
        const dbParams = [email];
        const [rows, error] = await dbQuery<VerificationToken[]>(sql, dbParams);
        if (error) {
            throw new Error("somethink went wrong");
          }
        return rows[0]
    } catch (error) {
        return;
    }
}

export const getEmailByToken = async (token: string) => {
    try {
        const sql =
        "SELECT * FROM verification_tokens WHERE token = ?";
        const dbParams = [token];
        const [rows, error] = await dbQuery<VerificationToken[]>(sql, dbParams);
        if (error) {
            throw new Error("somethink went wrong");
          }
        return rows[0]
    } catch (error) {
        return 
    }
}

export const deleteVerificationTokenById = async (id: number) => {
    try {
        const sql =
        "DELETE FROM verification_tokens WHERE id = ? LIMIT 1";
        const dbParams = [id];
        const [rows, error] = await dbQuery<ResultSetHeader>(sql, dbParams);
        if (error) {
            throw new Error("somethink went wrong");
          }
        return rows
    } catch (error) {
        return;
    }
}
