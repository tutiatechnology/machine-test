import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.testDb"); // returns Database object
export default db;
