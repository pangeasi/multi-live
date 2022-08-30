import merge from "lodash.merge";

export const i18nCommon = {
  es: {
    common: {
      avatarMenu: {
        logout: "Cerrar sesión",
      },
      hello: "Hola",
      errors: {
        required: "Campo requerido",
        email: "Introduce un email válido",
        minPassword: "La contraseña debe tener al menos 8 caracteres",
        passwordsMustMatch: "Las contraseñas no coinciden",
      },
    },
  },
  en: {
    common: {
      hello: "Hola",
      errors: {
        required: "Campo requerido",
        email: "Introduce un email válido",
        minPassword: "La contraseña debe tener al menos 8 caracteres",
        passwordsMustMatch: "Las contraseñas no coinciden",
      },
    },
  },
};

export const i18nLogin = {
  es: {
    login: {
      title: "Iniciar sesión",
      toast: {
        success: "Inicio de sesión correcto",
      },
      form: {
        questionSingUp: "¿No tienes una cuenta?",
      },
      fields: {
        email: "Email",
        password: "Contraseña",
        submit: "Iniciar sesión",
      },
    },
  },
  en: {
    login: {
      title: "Login",
      fields: {
        email: "Email",
        password: "Password",
        submit: "Login",
      },
    },
  },
};
export const i18nRegister = {
  es: {
    register: {
      title: "Registro",
      toast: {
        success: "Hola {name}! tu cuenta ha sido creada con éxito",
        errorUniqueEmail: "Hay un usuario registrado con ese email",
      },

      fields: {
        name: "Nombre",
        email: "Email",
        password: "Contraseña",
        confirmPassword: "Confirmar contraseña",
        submit: "Registrarse",
      },
    },
  },
  en: {
    register: {
      title: "Registro",
      fields: {
        name: "Nombre",
        email: "Correo electrónico",
        password: "Contraseña",
        confirmPassword: "Confirmar contraseña",
        submit: "Registrarse",
      },
    },
  },
};

export const i18nCreatePage = {
  es: {
    createSerie: {
      title: "Añadir nueva serie",
      fields: {
        name: "Nombre de la serie",
        description: "Descripción",
      },
      modal: {
        header: "Añadir canal",
        fields: {
          name: "Nombre del canal",
          platform: "Plataforma",
        },
      },
    },
  },
  en: {
    createSerie: {},
  },
};

export const translations = merge(
  i18nCommon,
  i18nLogin,
  i18nRegister,
  i18nCreatePage
);
export type Translations = typeof translations;
