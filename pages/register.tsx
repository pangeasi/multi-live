import { RegisterForm } from "client/components/RegisterForm";
import Layout from "client/components/UI/Layout";
import { useIntl } from "client/hooks/useIntl";

const RegisterPage = () => {
  const { t } = useIntl("register");
  return (
    <Layout title={t("title")}>
      <RegisterForm />
    </Layout>
  );
};
export default RegisterPage;
