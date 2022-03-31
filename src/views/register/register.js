import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { Logo } from "../../components/logo/logo";
import { HSpacer } from "../../components/spacer/spacer";
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

  function handleRegister() {
    register(email, password);
    navigate(AppRoutes.Login);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleConfirmPasswordChange(e) {
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
        <HSpacer height="16px" />
        <Button onClick={handleRegister}>Cadastrar</Button>
      </form>
    </div>
  );
}

export { Register };
