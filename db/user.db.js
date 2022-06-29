import db from "./connect.db";

function createUserTable() {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, count INT, email TEXT, password TEXT, phone TEXT, password TEXT, avatar TEXT, createdAt TEXT)"
    );
  });
}

export { createUserTable };
