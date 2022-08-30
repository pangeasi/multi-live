import { appRouter } from "server/_app";
import { ctx } from "utils/testUtils";
import { describe, it } from "vitest";

describe("i18n", () => {
  it("should be able to set i18n translations", async () => {
    const caller = appRouter.createCaller(ctx);
    const result = await caller.query("i18n.t", {
      locale: "es",
      ns: ["common"],
    });
    expect(result.hello).toEqual("Hola");
  });
});
