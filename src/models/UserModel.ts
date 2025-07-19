export type UserModel = {
  id: string;
  name: string;
  email: string;
  avatar_url?: string | null;
  created_at: Date;
};

export type CreateUserModel = Pick<
  UserModel,
  "id" | "name" | "email" | "avatar_url"
>;
