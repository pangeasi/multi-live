import { setLocale } from "yup";

export default setLocale({
  mixed: {
    required: "required",
  },
  string: {
    min: "min",
    max: "max",
    email: "email",
  },
});
