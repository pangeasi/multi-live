import * as yup from "yup";
import "./setLocale";

export const userCreateDTO = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(8, "minPassword"),
});

export const userLoginDTO = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8, "minPassword").required(),
});

export const userCreateForm = userCreateDTO.concat(
  yup.object({
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "passwordsMustMatch"),
  })
);
