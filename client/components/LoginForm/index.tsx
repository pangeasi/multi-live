import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "client/hooks/useIntl";
import { useLogin } from "client/queries/user";
import { userLoginDTO } from "DTOs/user";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { InferType } from "yup";
import { FormError } from "../UI/FormError";

export const LoginForm = () => {
  const methods = useForm<InferType<typeof userLoginDTO>>({
    resolver: yupResolver(userLoginDTO),
  });

  const { push } = useRouter();
  const toast = useToast();
  const { mutateAsync } = useLogin();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = methods;
  const { t } = useIntl("login");

  const onSubmit = handleSubmit(({ email, password }) => {
    mutateAsync({
      email,
      password,
    }).then(() => {
      toast({
        description: t("toast.success"),
        status: "success",
        position: "top-right",
      });
      reset();
      push("/");
    });
  });

  return (
    <FormProvider {...methods}>
      <form data-testid="login-form" onSubmit={onSubmit}>
        <VStack mt={8} spacing={8}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>{t("fields.email")}</FormLabel>
            <Input data-testid="email" {...register("email")} />
            <FormError name="email" />
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>{t("fields.password")}</FormLabel>
            <Input
              type="password"
              data-testid="password"
              {...register("password")}
            />
            <FormError name="password" />
          </FormControl>
          <Link href="/register">
            <a>
              <Text>{t("form.questionSingUp")}</Text>
            </a>
          </Link>
          <Button data-testid="submit" type="submit">
            {t("fields.submit")}
          </Button>
        </VStack>
      </form>
    </FormProvider>
  );
};
