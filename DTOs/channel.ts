import * as yup from "yup";

export const createChannelDTO = yup.object({
  name: yup.string().required(),
  platform: yup.string().required(),
});
