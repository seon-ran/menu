import { Request, Response } from "express";
import express from "express";
import path from "path";
import { connectDatabase, getCooksFromDb, CookRecord } from "./db.js";

const app = express();
const PORT = 3000;

app.use(express.static("../client"));

//POSTリクエストのボディをパースするためのミドルウェア
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.get("/cook", async (req: Request, res: Response) => {
  try {
    //db.tsに定義した関数を呼び出してデータを取得
    const cooks: CookRecord[] = await getCooksFromDb();
    //取得したデータをjsonで返す
    console.log(cooks);
    res.json(cooks); //取得したデータをjsonで返す
  } catch (error) {
    console.log("Error fetching cooks:", error);
    res.status(500).json({ error: "cooksデータを取得の失敗" });
  }
});

//サーバー起動処理をasync関数でラップ
async function startServer() {
  try {
    await connectDatabase(); //データベースを追加
    console.log("データベースへの接続に成功しました");
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("データベース接続または、サーバー起動に失敗しました:", error);
    process.exit(1); //エラーが発生したらプロセス終了
  }
}

startServer();
