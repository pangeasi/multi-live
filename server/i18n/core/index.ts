import merge from "lodash.merge";
import { I18n as I18nType } from "./types";

export class I18n {
  constructor(private i18n: I18nType) {}

  get get() {
    return this.i18n;
  }

  add(i18n: I18nType) {
    this.i18n = merge(this.i18n, i18n);
    return this;
  }
}
