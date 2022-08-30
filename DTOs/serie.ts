import * as yup from "yup";

export const createSerieDTO = yup.object({
  name: yup.string().required(),
  description: yup.string().nullable(),
});
