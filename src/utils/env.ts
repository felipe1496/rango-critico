import { merge } from "lodash";
import { ulid } from "ulid";
import { z } from "zod";

const envSchemaPrivate = z.object({
	DATABASE_URL: z.url(),
	JWT_SECRET: z.string().optional().default(ulid()),
	JWT_EXPIRES_IN: z.string().optional().default("1d"),
});

const envSchemaPublic = z.object({
	NEXT_PUBLIC_API_URL: z.url(),
	NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string(),
});

type EnvPrivate = z.infer<typeof envSchemaPrivate>;
type EnvPublic = z.infer<typeof envSchemaPublic>;
type Env = EnvPrivate & EnvPublic;

export function env(): Env {
	const publicEnvs = {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
	};
	if (typeof window === "undefined") {
		return merge(envSchemaPrivate.parse(process.env), publicEnvs) as Env;
	} else {
		return envSchemaPublic.parse(publicEnvs) as Env;
	}
}
