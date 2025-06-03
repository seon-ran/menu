interface CookRecord {
  id: number;
  name: string;
}

//DOMが読み込まれたときに実行
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/cook");
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTPエラー:${response.status}`);
    }

    const cooks: CookRecord[] = await response.json();
    console.log("取得したcooks", cooks);

    const body = document.body;
    const list = document.createElement("ul");

    cooks.forEach((cook) => {
      const item = document.createElement("li");
      item.textContent = `ID: ${cook.id}, Name: ${cook.name}`;
      list.appendChild(item);
    });

    body.appendChild(list);
  } catch (error) {
    console.error("cookデータの取得に失敗した:", error);
  }
});
