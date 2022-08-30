import { useRouter } from "next/router";
import { trpc } from "utils/trpc";
import mapValues from "lodash.mapvalues";
import isEmpty from "lodash.isempty";
import get from "lodash.get";
import { KeysOfI18n, LocaleType } from "server/i18n/core/types";
import { Translations } from "utils/translations";

export const useIntl = <T extends keyof Translations[LocaleType]>(
  ...ns: T[]
) => {
  const { locale, defaultLocale } = useRouter();
  const { data, isLoading } = trpc.useQuery([
    "i18n.t",
    {
      locale: locale || defaultLocale || "en",
      ns: [...ns],
    },
  ]);

  return {
    t: (
      key: KeysOfI18n<Translations[LocaleType][T]>,
      replacers?: Record<string, string>
    ) => {
      const messages = mapValues(data, (value) => (isLoading ? "" : value));

      return isEmpty(messages)
        ? key
        : Object.keys(replacers! || {}).reduce(
            (prev, curr) =>
              `${prev.replace(new RegExp(`{${curr}}`, "g"), replacers![curr])}`,
            get(messages, key, key) as string
          );
    },
  };
};
