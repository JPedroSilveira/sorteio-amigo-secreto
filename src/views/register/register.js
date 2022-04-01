import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { Logo } from "../../components/logo/logo";
import { HSpacer } from "../../components/spacer/spacer";
import { Error } from "../../components/text/error/error";
import { Title } from "../../components/text/title/title";
import { AppRoutes } from "../../constants/routes.constants";
import { register } from "../../services/register.service";
import "./register.css";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  function cleanErrors() {
    if (registerError) setRegisterError("");
  }

  function handleRegister(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setRegisterError("Senhas não são iguais");
    } else {
      const error = register(name, email, password);
      if (!error) {
        navigate(AppRoutes.Login);
      } else {
        setRegisterError(error);
      }
    }
  }

  function handleNameChange(e) {
    cleanErrors();
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    cleanErrors();
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    cleanErrors();
    setPassword(e.target.value);
  }

  function handleConfirmPasswordChange(e) {
    cleanErrors();
    setConfirmPassword(e.target.value);
  }

  return (
    <div className="Register">
      <HSpacer height="62px" />
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
        />
        <HSpacer height="8px" />
        <Input
          value={email}
          onChange={handleEmailChange}
          label="Email"
          id="username"
          type="text"
        />
        <HSpacer height="8px" />
        <Input
          value={password}
          onChange={handlePasswordChange}
          label="Senha"
          id="password"
          type="password"
        />
        <HSpacer height="8px" />
        <Input
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          label="Repetir senha"
          id="confirm-password"
          type="password"
        />
        <Error>{registerError}</Error>
        <HSpacer height="16px" />
        <Button onClick={handleRegister}>Cadastrar</Button>
        <HSpacer height="16px" />
      </form>
    </div>
  );
}

export { Register };
