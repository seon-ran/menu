import "dotenv/config";
import { Client, QueryResult, Result } from "pg";

//接続された情報
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export async function connectDatabase() {
  try {
    await client.connect();

    const query = "select * from cook;";

    const result = await client.query(query);

    console.log(result.rows);
  } catch (err) {
    console.log("データベース操作中にエラーが発生しました:", err);
  }
}

export interface CookRecord {
  id: number;
  name: string;
}

export async function getCooksFromDb(): Promise<CookRecord[]> {
  try {
    const query = "select * from cook;";
    const result: QueryResult<CookRecord> = await client.query(query);
    return result.rows;
  } catch (err) {
    console.error("`cook`データの取得中にエラーが発生しました:", err);
    throw err; //エラーを呼び出し元に再スローして、処理を委ねる
  }
}
