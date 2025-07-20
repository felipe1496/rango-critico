import { UnauthorizedException } from "@/utils/errors/UnauthorizedException";
import jwt from "jsonwebtoken";
import { env } from "@/utils/env";
import { get, set, split } from "lodash";
import type { ApiRequest } from "../handleAPI";

export const authGuard = (req: ApiRequest) => {
	const [, token] = split(req.headers.get("Authorization"), " ");

	if (!token) {
		throw new UnauthorizedException("Token not found");
	}

	try {
		const payload = jwt.verify(token, env().JWT_SECRET);
		set(req, "userId", get(payload, "userId"));
	} catch {
		throw new UnauthorizedException("Invalid token");
	}
};
