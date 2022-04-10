import { get_login_by_phone, save_login } from "../store/auth.store";

class RegisterService {
  static register(name, phone, password) {
    const validationError = Private.validateNewUser(name, phone, password);
    if (validationError) {
      return validationError;
    }
    save_login({
      name: name,
      phone: phone,
      password: password,
    });
  }
}

class Private {
  static validateNewUser(name, phone, password) {
    if (!name) return "Nome não pode ser vazio";
    if (!phone) return "Telefone não pode ser vazio";
    if (!password) return "Senha não pode ser vazia";
    if (password.length < 8) return "Senha deve ter no mínimo 8 caracteres";

    const loginExists = get_login_by_phone(phone);
    if (loginExists) return "O usuário já existe";

    return null;
  }
}

export { RegisterService };