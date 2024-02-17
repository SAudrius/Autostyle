import "dotenv/config";

import { connect } from "@planetscale/database";

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

export const conn = connect(config);
// testDb
const showTables = await conn.execute("SHOW tables");
console.log("showTables ===", showTables);
