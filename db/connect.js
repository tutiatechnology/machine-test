import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { Asset } from "expo-asset";

async function openDatabase() {
  return FileSystem.getInfoAsync(
    `${FileSystem.documentDirectory}assets/test.db`
  ).then((result) => {
    if (result.exists) {
      const db = SQLite.openDatabase("test.db");
      return db;
    } else {
      return FileSystem.downloadAsync(
        Asset.fromModule(require("../assets/test.db")).uri,
        `${FileSystem.documentDirectory}SQLite/test.db`
      ).then(() => {
        const db = SQLite.openDatabase("test.db");
        return db;
      });
    }
  });
}

export { openDatabase };
