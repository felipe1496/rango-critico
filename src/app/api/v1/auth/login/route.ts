import axios from "axios";
import jwt from "jsonwebtoken";
import z from "zod";
import type { UserModel } from "@/models/UserModel";
import { handleAPI } from "@/utils/api/handleAPI";
import { env } from "@/utils/env";
import { ForbiddenException } from "@/utils/errors/ForbiddenException";
import { createUser, findUserByEmail } from "../core";

export const POST = handleAPI()
	.body(
		z.object({
			access_token: z.string(),
		}),
	)
	.fn(async (req): Promise<{ user: UserModel; access_token: string }> => {
		const res = await axios
			.get<{
				email: string;
				verified_email: boolean;
				name: string;
				picture: string;
			}>("https://www.googleapis.com/oauth2/v1/userinfo", {
				headers: {
					Authorization: `Bearer ${req.body.access_token}`,
				},
			})
			.catch(() => {
				throw new ForbiddenException("Invalid token");
			});

		if (!res.data.verified_email) {
			throw new ForbiddenException("Email not verified");
		}

		const userExists = await findUserByEmail(res.data.email);

		let authUser: UserModel;

		if (userExists) {
			authUser = userExists;
		} else {
			const createdUser = await createUser({
				email: res.data.email,
				name: res.data.name,
				avatar_url: res.data.picture,
			});

			authUser = createdUser;
		}

		const access_token = jwt.sign(
			{
				userId: authUser.id,
			},
			env().JWT_SECRET,
			{
				// biome-ignore lint/suspicious/noExplicitAny: jsonwebtoken dont export expiresIn type
				expiresIn: env().JWT_EXPIRES_IN as any,
			},
		);

		return { user: authUser, access_token };
	});
