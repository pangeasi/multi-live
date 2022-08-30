import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { i18nRoute } from "./i18n";
import { user } from "./user";
import { verify } from "jsonwebtoken";
import { env } from "utils/env";
import { User } from "@prisma/client";
import { serie } from "./serie";

export const createContext = ({ req, res }: CreateNextContextOptions) => {
  return {
    req,
    res,
    user: {} as User,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
export const appRouter = trpc
  .router<Context, { auth: boolean }>()
  .middleware(async ({ meta, next, ctx }) => {
    if (typeof window === "undefined") {
      const [, token] = (ctx.req.headers.cookie?.split("=") as [
        "token",
        string | undefined
      ]) || ["token", undefined];

      const payload = token && (verify(token, env.JWT_SECRET) as User);
      const user = payload || null;

      if (user) {
        return next({
          ctx: {
            ...ctx,
            user,
          },
        });
      }

      if (meta?.auth && !user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }
    return next();
  })
  .merge("user.", user)
  .merge("i18n.", i18nRoute)
  .merge("serie.", serie);

export type AppRouter = typeof appRouter;
