import { testConnection } from "./testConnection";
import dotenv from "dotenv";
dotenv.config();

testConnection(true).then(() => process.exit());
