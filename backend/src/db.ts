import "dotenv/config";
import { Client } from "pg";

//接続された情報
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

async function connectDb() {
  try {
    await client.connect();

    const query = "select * from cook;";

    const result = await client.query(query);

    console.log(result.rows);
  } catch (err) {
    console.log("データベース操作中にエラーが発生しました:", err);
  } finally {
    await client.end();
  }
}

connectDb();
