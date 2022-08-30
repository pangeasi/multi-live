import { Heading } from "@chakra-ui/react";
import Layout from "client/components/UI/Layout";
import { useIntl } from "client/hooks/useIntl";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  const { t } = useIntl("common");

  return (
    <Layout>
      <Heading>Series</Heading>
    </Layout>
  );
};

export default Home;
