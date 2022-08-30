import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter, createContext } from "server/_app";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
