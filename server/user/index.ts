import { PrismaClient } from "@prisma/client";
import * as trpc from "@trpc/server";
import { userCreateDTO, userLoginDTO } from "DTOs/user";
import * as yup from "yup";
import { genSalt, hash, compare } from "bcrypt";
import { TRPCError } from "@trpc/server";
import { Context } from "server/_app";
import { sign } from "jsonwebtoken";
import { env } from "utils/env";
const prisma = new PrismaClient();
export const user = trpc
  .router<Context, { auth: boolean }>()

  // Create a new user in the database
  .mutation("create", {
    input: userCreateDTO,
    async resolve({ input: data }) {
      const salt = await genSalt(10);
      const passwordHashed = await hash(data.password, salt);
      return await prisma.user.create({
        data: {
          ...data,
          password: passwordHashed,
        },
      });
    },
  })

  // Login
  .mutation("login", {
    input: userLoginDTO,
    async resolve({ input: data, ctx }) {
      const user = await prisma.user.findFirst({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found",
        });
      }

      const isValid = await compare(data.password, user.password);

      if (!isValid) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid password",
        });
      }

      const token = sign({ ...user, password: undefined }, env.JWT_SECRET, {
        algorithm: "HS256",
      });
      ctx.res.setHeader(
        "Set-Cookie",
        `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`
      );
      return { ...user, password: undefined };
    },
  })

  // Logout
  .mutation("logout", {
    meta: {
      auth: true,
    },
    async resolve({ ctx }) {
      ctx.res.setHeader(
        "Set-Cookie",
        "token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      );
      return { message: "Logged out" };
    },
  })

  // Me
  .query("me", {
    async resolve({ ctx }) {
      const user = ctx.user;

      return user;
    },
  })

  // Get a user by id
  .query("getById", {
    input: yup.string().required(),
    async resolve({ input: id }) {
      return await prisma.user.findUnique({
        where: {
          id,
        },
      });
    },
  });
