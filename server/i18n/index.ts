import * as trpc from "@trpc/server";
import merge from "lodash.merge";
import { translations } from "utils/translations";
import * as yup from "yup";
import { I18n } from "server/i18n/core";
import { LocaleType, SubNamespace } from "server/i18n/core/types";
import { Context } from "server/_app";

export const i18n = new I18n(translations);

export const i18nRoute = trpc.router<Context, { auth: boolean }>().query("t", {
  input: yup.object({
    locale: yup.string().required(),
    ns: yup.array().of(yup.string().required()).required(),
  }),
  async resolve({ input: { locale, ns } }) {
    const translations = ns.map((ns) => i18n.get![locale as LocaleType]![ns]);
    return merge({}, ...translations) as SubNamespace;
  },
});
