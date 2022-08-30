import { LoginForm } from "client/components/LoginForm";
import Layout from "client/components/UI/Layout";
import { useIntl } from "client/hooks/useIntl";

const LoginPage = () => {
  const { t } = useIntl("login");
  return (
    <Layout title={t("title")}>
      <LoginForm />
    </Layout>
  );
};

export default LoginPage;
