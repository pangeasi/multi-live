import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppRouter } from "server/_app";
import { withTRPC } from "@trpc/next";
import { getBaseUrl } from "utils/trpc";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default withTRPC<AppRouter>({
  config() {
    return {
      url: `${getBaseUrl()}/api`,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            retry(failureCount) {
              return failureCount < 1;
            },
          },
        },
      },
    };
  },
  ssr: true,
})(MyApp);
