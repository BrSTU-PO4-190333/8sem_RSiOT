const { helloWorld, deleteTables } = require("./");
const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", function (req, res) {
  helloWorld(req, res);
});

app.get("/delete", function (req, res) {
  deleteTables(req, res);
});

app.listen(PORT, () => {
  console.log(` Server: http://localhost:${PORT}`);
  console.log(" ");
  console.log(" > Этот сервер - это аналог Google Cloud Functions");
  console.log(
    ` > Чтобы запустить функцию перейди по ссылке: http://localhost:${PORT}`
  );
  console.log(
    ` > Чтобы очистить таблицы BigTable и BigQuery перейди по ссылке: http://localhost:${PORT}/delete`
  );
});
