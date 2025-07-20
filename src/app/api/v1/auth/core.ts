import type { CreateUserModel, UserModel } from "@/models/UserModel";
import { insert, select } from "@/utils/api/functions";
import { ConflictException } from "@/utils/errors/ConflictException";
import { InternalServerErrorException } from "@/utils/errors/InternalServerErrorException";
import { NotFoundException } from "@/utils/errors/NotFoundException";
import { where } from "@/utils/where-filter";
import { ulid } from "ulid";

const users = select<UserModel>("users");
const save = insert<CreateUserModel, UserModel>("users");

export const findUserByEmail = async (email: string) => {
	const res = await users(where().and("email", "eq", email));

	if (!res.ok) {
		throw new NotFoundException("User not found");
	}

	return res.data[0];
};

export const createUser = async (data: Omit<CreateUserModel, "id">) => {
	const user = await findUserByEmail(data.email);

	if (user) {
		throw new ConflictException("User already exists");
	}

	const res = await save({ id: ulid(), ...data });

	if (!res.ok) {
		throw new InternalServerErrorException(
			"It was not possible to create user",
		);
	}

	return res.data[0];
};
