import { describe, it } from "vitest";
import { fireEvent, render, screen, userEvent, waitFor } from "utils/testUtils";
import { LoginForm } from ".";
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { genSaltSync, hashSync } from "bcrypt";
const prisma = new PrismaClient();
const email = "dani@proton.com";
const salt = genSaltSync(10);
const password = "123456789";
const passwordHashed = hashSync(password, salt);
beforeAll(async () => {
  await prisma.user.deleteMany({});
});
beforeEach(() => {
  render(<LoginForm />);
});

describe("Login Form", () => {
  const loginInputs = async () => {
    return await waitFor(() => {
      const emailInput = screen.getByTestId("email");
      const passwordInput = screen.getByTestId("password");
      const submitButton = screen.getByTestId("submit");
      return {
        emailInput,
        passwordInput,
        submitButton,
      };
    });
  };

  it("errors validation should be display if no fields filled ", async () => {
    const { submitButton } = await loginInputs();

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Campo requerido")).toBeInTheDocument();
      expect(
        screen.getByText("La contraseña debe tener al menos 8 caracteres")
      ).toBeInTheDocument();
    });
  });

  it("should be login if user exists", async () => {
    const { emailInput, passwordInput, submitButton } = await loginInputs();
    prisma.user
      .create({
        data: {
          name: faker.name.firstName(),
          email,
          password: passwordHashed,
        },
      })
      .then(async () => {
        await userEvent.type(emailInput, email);
        await userEvent.type(passwordInput, password);
        await fireEvent.click(submitButton);

        await waitFor(() => {
          expect(
            screen.getByText("Inicio de sesión correcto")
          ).toBeInTheDocument();
        });
      });
  });
});
