import { appRouter } from "server/_app";
import { beforeAll, describe, it } from "vitest";
import { faker } from "@faker-js/faker";
import { PrismaClient, User } from "@prisma/client";
import { ctx } from "utils/testUtils";
import { result } from "lodash";

const prisma = new PrismaClient();
const user = {
  name: faker.name.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

beforeAll(async () => {
  await prisma.user.deleteMany({});
});

describe("User", () => {
  it("should be able to create a user and return the user", async () => {
    const caller = appRouter.createCaller(ctx);
    const { password, ...result } = await caller.mutation("user.create", {
      ...user,
    });

    expect(result).toEqual({ ...user, id: result.id, password: undefined });
  });

  it("should be able to get a user by id", async () => {
    const caller = appRouter.createCaller(ctx);
    const userFounded = await prisma.user.findFirst();
    const user = await caller.query("user.getById", userFounded?.id!);

    expect(user).toEqual(userFounded);
  });

  it("should be able to login", async () => {
    const caller = appRouter.createCaller(ctx);
    const result = await caller.mutation("user.login", {
      email: user.email,
      password: user.password,
    });

    expect(result).toEqual({ ...user, id: result.id, password: undefined });
  });

  it("should be return my user", async () => {
    const myUser = await prisma.user.findFirst({
      where: { email: user.email },
    });
    const caller = appRouter.createCaller({
      ...ctx,
      user: { ...myUser! },
    });
    const { password, ...result } = await caller.query("user.me");

    expect(result).toEqual({ ...myUser, id: result.id, password: undefined });
  });
});
