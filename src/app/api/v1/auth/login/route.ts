import { handleAPI } from "@/utils/api/handleAPI";
import { ForbiddenException } from "@/utils/errors/ForbiddenException";
import axios from "axios";
import z from "zod";
import { createUser, findUserByEmail } from "../core";
import { UserModel } from "@/models/UserModel";
import jwt from "jsonwebtoken";
import { env } from "@/utils/env";

export const POST = handleAPI()
  .body(
    z.object({
      access_token: z.string(),
    })
  )
  .fn(async (req) => {
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expiresIn: env().JWT_EXPIRES_IN as any,
      }
    );

    return { user: authUser, access_token };
  });
