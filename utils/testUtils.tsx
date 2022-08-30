/* eslint-disable import/export */
import { ChakraProvider } from "@chakra-ui/react";
import { cleanup, render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { afterEach, vi } from "vitest";
import { trpc } from "utils/trpc";
import { env } from "utils/env";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import { fetch } from 'cross-fetch';

global.fetch = fetch;
beforeAll(() => {
  vi.mock("next/router", () => ({
    useRouter() {
      return {
        route: "/",
        pathname: "",
        query: "",
        asPath: "",
        locale: "es",
        push() {},
      };
    },
  }));
});

afterEach(() => {
  cleanup();
});

const queryClient = new QueryClient({});
const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => {
      const trpcClient = trpc.createClient({
        url: env.TRPC_API_URL,
      });

      return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider>{children}</ChakraProvider>
          </QueryClientProvider>
        </trpc.Provider>
      );
    },
    ...options,
  });

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };

export const ctx = { res: { setHeader(name, value) {} } } as {
  req: NextApiRequest;
  res: NextApiResponse<any>;
  user: User;
};
