import { Pool, QueryResult } from "pg";

export const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "automate",
  password: process.env.DB_PASSWORD || "aniket",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  ssl: true,
});

export type QueryResultDB = {
  result: string;
  queryResult?: QueryResult | undefined;
  errorMessage?: string;
  details?: string;
};

// Error table for known PostgreSQL error codes
const PGErrorTable = {
  errors: [
    { code: "ECONNREFUSED", message: "Connection refused" },
    { code: "ETIMEDOUT", message: "Connection timed out" },
    { code: "42601", message: "Syntax error" },
    { code: "42P01", message: "Undefined table" },
    { code: "42703", message: "Undefined column" },
    { code: "23505", message: "Unique constraint violation" },
    { code: "23503", message: "Foreign key violation" },
    { code: "23502", message: "NOT NULL constraint violation" },
    { code: "22P02", message: "Invalid text representation" },
    { code: "22007", message: "Invalid datetime format" },
    { code: "40001", message: "Serialization failure" },
    { code: "40P01", message: "Deadlock detected" },
    { code: "42501", message: "Insufficient privileges" },
    { code: "53200", message: "Out of memory" },
  ],
};

export const queryDB = async (
  query: string,
  value: any[]
): Promise<QueryResultDB> => {
  try {
    const res = await pool.query(query, value);
    return { result: "success", queryResult: res };
  } catch (e: any) {
    console.error("Database error:", e.message);
    if (e.code === "23505") {
      return {
        result: "error",
        errorMessage: "Duplicate move",
        details: e.detail,
      };
    }
    for (const msg of PGErrorTable.errors) {
      if (e.code === msg.code) {
        return {
          result: "error",
          errorMessage: msg.message,
          details: e.detail,
        };
      }
    }
    return {
      result: "error",
      errorMessage: `Unknown database error: ${e.message}`,
      details: e.detail,
    };
  }
};

export const getExecutionByStatus = async (status: string = "pending") => {
  try {
    const query = `
    SELECT * FROM "Execution"
    WHERE status = $1;
  `;
    const queryRes = await queryDB(query, [status]);
    if (queryRes.result == "error") {
      throw new Error(queryRes.errorMessage);
    }
    const res = queryRes.queryResult?.rows;
  } catch (e: any) {
    console.error(e);
  }
};

export async function checkDbConnection() {
  await pool.query("SELECT 1");
}

export default pool;
