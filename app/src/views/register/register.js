import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { Logo } from "../../components/logo/logo";
import { HSpacer } from "../../components/spacer/spacer";
import { Title } from "../../components/text/title/title";
import { AppRoutes } from "../../constants/routes.constants";
import { AuthService } from "../../services/auth.service";
import { Objects } from "../../utils/object.utils";
import { LoaderContext } from "../../context/loader/loader.context";
import { Error } from "../../components/text/error/error";
import { Strings } from "../../utils/string.utils";
import "./register.css";

function Register() {
  const navigate = useNavigate();
  const { executeWithLoading } = useContext(LoaderContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [registerError, setRegisterError] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    const numericPhone = Strings.removeNonNumericCharacters(phone);
    const errors = AuthService.isValidUser(
      name,
      numericPhone,
      password,
      confirmPassword
    );
    if (Objects.isNotEmpty(errors)) {
      setErrors(errors);
    } else {
      const error = await executeWithLoading(
        AuthService.register(name, numericPhone, password)
      );
      if (Objects.isEmpty(error)) {
        navigate(AppRoutes.Login);
      } else {
        setRegisterError(error);
      }
    }
  }

  function updateErrors() {
    setErrors({ ...errors });
    setRegisterError("");
  }

  function handleNameChange(e) {
    errors.name = "";
    updateErrors();
    setName(e.target.value);
  }

  function handlePhoneChange(e) {
    errors.phone = "";
    updateErrors();
    setPhone(e.target.value);
  }

  function handlePasswordChange(e) {
    errors.password = "";
    updateErrors();
    setPassword(e.target.value);
  }

  function handleConfirmPasswordChange(e) {
    errors.confirmPassword = "";
    updateErrors();
    setConfirmPassword(e.target.value);
  }

  return (
    <div className="Register">
      <HSpacer height="48px" />
      <Logo />
      <HSpacer height="14px" />
      <Title>Cadastro</Title>
      <HSpacer height="16px" />
      <form>
        <Input
          value={name}
          onChange={handleNameChange}
          label="Name"
          id="name"
          type="text"
          error={errors.name}
        />
        <HSpacer height="8px" />
        <Input
          value={phone}
          onChange={handlePhoneChange}
          label="Telefone"
          id="username"
          type="text"
          error={errors.phone}
        />
        <HSpacer height="8px" />
        <Input
          value={password}
          onChange={handlePasswordChange}
          label="Senha (Mínimo 8 dígitos)"
          id="password"
          type="password"
          error={errors.password}
        />
        <HSpacer height="8px" />
        <Input
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          label="Repetir senha"
          id="confirm-password"
          type="password"
          error={errors.confirmPassword}
        />
        <HSpacer height="16px" />
        <Button onClick={handleRegister}>Cadastrar</Button>
        <Error center>{registerError}</Error>
        <HSpacer height="16px" />
      </form>
    </div>
  );
}

export { Register };
