import { PrismaClient } from "@prisma/client";
import * as trpc from "@trpc/server";
import * as yup from "yup";
import { TRPCError } from "@trpc/server";
import { Context } from "server/_app";
import { createSerieDTO } from "DTOs/serie";
const prisma = new PrismaClient();
export const serie = trpc
  .router<Context, { auth: boolean }>()

  // Create a new user in the database
  .mutation("create", {
    meta: { auth: true },
    input: createSerieDTO,
    async resolve({ input: data, ctx }) {
      return await prisma.serie.create({
        data: {
          name: data.name,
          createdBy: ctx.user.id,
        },
      });
    },
  });
