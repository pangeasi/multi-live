export type LocaleType = "es" | "en";

export interface SubNamespace {
  [key: string]: string | SubNamespace;
}

export interface Namespace {
  [key: string]: string | SubNamespace;
}

export type I18n = {
  [key in LocaleType]?: Namespace;
};

type Prev = [never, 1, ...0[]];

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

type Leaves<T, D extends number = 1> = [D] extends [never]
  ? never
  : T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : "";

export type KeysOfI18n<T> = Leaves<T>;
