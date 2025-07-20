import pg from "pg";
import { migrate } from "postgres-migrations";
import pkg from "@next/env";
const { loadEnvConfig } = pkg;

const projectDir = process.cwd();
loadEnvConfig(projectDir);
// TODO: criar logger com cores
export default async function run() {
	const connectionString = process.env.DATABASE_URL;

	const client = new pg.Client({
		connectionString,
	});
	try {
		await client.connect();
		console.log(`Connected to database at "${connectionString}"`);
	} catch (error) {
		console.error(
			`It was not possible to connect to the database at ${connectionString}: ${error}`,
		);
	}

	try {
		await migrate({ client }, "./.migrations");
		console.log("Database migrated successfully");
	} catch (error) {
		console.error(`It was not possible to migrate: ${error}`, "Migration");
	} finally {
		await client.end();
		console.log("Database connection closed");
	}
}

run();
