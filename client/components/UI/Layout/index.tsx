import { Box, Container, Flex } from "@chakra-ui/react";
import AvatarMenu from "client/components/AvatarMenu";
import Head from "next/head";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Multi live" }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Multi live app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex w="full" bg="blue.50" justify="space-between" p={2}>
        <Box />
        <AvatarMenu />
      </Flex>
      <Container maxW="container.xl" mt={6}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
