import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { InferType } from "yup";
import { userCreateForm } from "DTOs/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateUser } from "client/queries/user";
import { useIntl } from "client/hooks/useIntl";
import { FormError } from "../UI/FormError";
import { useRouter } from "next/router";

type Fields = {
  name: keyof InferType<typeof userCreateForm>;
  label: string;
  type: "text" | "email" | "password";
};
export const RegisterForm = () => {
  const { t } = useIntl("register");
  const { push } = useRouter();

  const methods = useForm<InferType<typeof userCreateForm>>({
    resolver: yupResolver(userCreateForm),
  });
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;
  const { mutateAsync } = useCreateUser();
  const toast = useToast();
  const onSubmit = handleSubmit(({ confirmPassword, ...data }) => {
    mutateAsync(data)
      .then(({ name }) => {
        toast({
          description: t("toast.success", { name: name! }),
          status: "success",
          position: "top-right",
        });
        reset();
        push("/login");
      })
      .catch(({ message }) => {
        // 'Invalid `prisma.user.create()` invocation: Unique constraint failed on the fields: (`email`)'
        if (
          message.includes("Unique constraint failed on the fields: (`email`)")
        ) {
          toast({
            description: t("toast.errorUniqueEmail"),
            status: "error",
            position: "top-right",
          });
        }
      });
  });

  const fields: Fields[] = [
    {
      name: "name",
      label: t("fields.name"),
      type: "text",
    },
    {
      name: "email",
      label: t("fields.email"),
      type: "email",
    },
    {
      name: "password",
      label: t("fields.password"),
      type: "password",
    },
    {
      name: "confirmPassword",
      label: t("fields.confirmPassword"),
      type: "password",
    },
  ];

  return (
    <FormProvider {...methods}>
      <form data-testid="register-form" onSubmit={onSubmit}>
        <VStack mt={8} spacing={8}>
          {fields.map(({ name, label, type }) => (
            <FormControl isInvalid={!!errors[name]} key={name}>
              <FormLabel>{label}</FormLabel>
              <Input data-testid={name} {...register(name)} type={type} />
              <FormError data-testid={`error-${name}`} name={name} />
            </FormControl>
          ))}

          <Button data-testid="submit" type="submit" formNoValidate>
            {t("fields.submit")}
          </Button>
        </VStack>
      </form>
    </FormProvider>
  );
};
