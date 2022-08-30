import { act, fireEvent, render, screen, waitFor } from "utils/testUtils";
import userEvent from "@testing-library/user-event";
import { beforeAll, beforeEach, describe } from "vitest";
import { RegisterForm } from ".";
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
beforeAll(async () => {
  await prisma.user.deleteMany({});
});

beforeEach(() => {
  render(<RegisterForm />);
});
describe("RegisterForm", () => {
  const userInputs = async () => {
    return await waitFor(() => {
      const nameInput = screen.getByTestId("name");
      const emailInput = screen.getByTestId("email");
      const passwordInput = screen.getByTestId("password");
      const confirmPasswordInput = screen.getByTestId("confirmPassword");
      const submitButton = screen.getByTestId("submit");
      return {
        nameInput,
        emailInput,
        passwordInput,
        confirmPasswordInput,
        submitButton,
      };
    });
  };
  it("errors validation should be displayed if no field has been filled", async () => {
    const { submitButton } = await userInputs();

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText("Campo requerido")).toHaveLength(4);
    });
  });

  it("should display error if email is not valid", async () => {
    const {
      nameInput,
      emailInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    } = await userInputs();

    await userEvent.type(nameInput, "John");
    await userEvent.type(emailInput, "invalid-email@x");
    await userEvent.type(passwordInput, "12345678");
    await userEvent.type(confirmPasswordInput, "12345678");
    await fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Introduce un email válido")).toBeInTheDocument();
    });
  });

  it("should display error if password is not valid", async () => {
    const { nameInput, emailInput, passwordInput, submitButton } =
      await userInputs();

    await userEvent.type(nameInput, "John");
    await userEvent.type(emailInput, "john@doe.es");
    await userEvent.type(passwordInput, "1234567");
    await fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("La contraseña debe tener al menos 8 caracteres")
      ).toBeInTheDocument();
    });
  });

  it("should display error if password and confirmPassword not matched", async () => {
    const {
      nameInput,
      emailInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    } = await userInputs();

    await userEvent.type(nameInput, "John");
    await userEvent.type(emailInput, "john@doe.es");
    await userEvent.type(passwordInput, "12345678");
    await userEvent.type(confirmPasswordInput, "1234567g");

    await fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Las contraseñas no coinciden")
      ).toBeInTheDocument();
    });
  });

  it("Should send and display a toast with a succesful message", async () => {
    const {
      nameInput,
      emailInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    } = await userInputs();
    const password = faker.internet.password(12);

    await userEvent.type(nameInput, faker.name.fullName());
    await userEvent.type(emailInput, faker.internet.email());
    await userEvent.type(passwordInput, password);
    await userEvent.type(confirmPasswordInput, password);
    await fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/tu cuenta ha sido creada con éxito/)
      ).toBeInTheDocument();
    });
  });

  it("should display error if email already exists", async () => {
    const {
      nameInput,
      emailInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    } = await userInputs();
    const email = faker.internet.email();
    const password = faker.internet.password(12);

    await userEvent.type(nameInput, faker.name.fullName());
    await userEvent.type(emailInput, email);
    await userEvent.type(passwordInput, password);
    await userEvent.type(confirmPasswordInput, password);
    await fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId("register-form")).toHaveFormValues({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    });

    await userEvent.clear(nameInput);
    await userEvent.clear(emailInput);
    await userEvent.clear(passwordInput);
    await userEvent.clear(confirmPasswordInput);

    await userEvent.type(nameInput, faker.name.fullName());
    await userEvent.type(emailInput, email);
    await userEvent.type(passwordInput, password);
    await userEvent.type(confirmPasswordInput, password);
    await fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Hay un usuario registrado con ese email")
      ).toBeInTheDocument();
    });
  });

  it("Should reset the form when successful", async () => {
    const {
      nameInput,
      emailInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    } = await userInputs();
    const nameValue = faker.name.fullName();
    const emailValue = faker.internet.email();
    const passwordValue = faker.internet.password(12);

    await userEvent.type(nameInput, nameValue);
    await userEvent.type(emailInput, emailValue);
    await userEvent.type(passwordInput, passwordValue);
    await userEvent.type(confirmPasswordInput, passwordValue);

    await waitFor(() => {
      expect(screen.getByTestId("register-form")).toHaveFormValues({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
        confirmPassword: passwordValue,
      });
    });

    await fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId("register-form")).toHaveFormValues({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    });
  });
});
