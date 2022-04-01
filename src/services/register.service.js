import { get_login_by_email, save_login } from "../store/auth.store";

function register(name, email, password) {
  const validationError = validate_register(name, email, password);
  if (validationError) return validationError;
  save_login({
    name: name,
    email: email,
    password: password,
  });
}

function validate_register(name, email, password) {
  if (!name) return "Nome não pode ser vazio";
  if (!email) return "Email não pode ser vazio";
  if (!password) return "Senha não pode ser vazia";
  if (password.length < 8) return "Senha deve ter no mínimo 8 caracteres";

  const loginExists = get_login_by_email(email);
  if (loginExists) return "O usuário já existe";

  return null;
}

export { register };
