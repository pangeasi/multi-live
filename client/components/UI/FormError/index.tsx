import { FormErrorMessage, FormErrorMessageProps } from "@chakra-ui/react";
import { useIntl } from "client/hooks/useIntl";
import { useFormContext } from "react-hook-form";

type FormErrorProps = {
  name: string;
} & FormErrorMessageProps;

export const FormError = ({ name }: FormErrorProps) => {
  const { t } = useIntl("common");
  const {
    formState: { errors },
  } = useFormContext();
  return (
    <FormErrorMessage>
      {t(("errors." + errors[name]?.message) as "errors.required")}
    </FormErrorMessage>
  );
};
