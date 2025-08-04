import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

class Database {
  private dbUrl: string;

  constructor() { this.dbUrl = process.env.MONGODB_URL || ""; }

  public connect() {
    return mongoose.connect(this.dbUrl, { dbName: "expense-tracker-db" })
      .then(() => console.log("Database Connected ✅✅"))
      .catch((err) => console.error("Database not connected ❌❌", err));
  }
}

//*********** database connection ***********//
const connection = new Database();
connection.connect();

export default connection; // export it to use in other files