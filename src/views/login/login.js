import { useState } from "react";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { Logo } from "../../components/logo/logo";
import { HSpacer } from "../../components/spacer/spacer";
import { Link } from "../../components/text/link";
import { Title } from "../../components/text/title";
import { AppRoutes } from "../../constants/routes.constants";
import { login } from "../../services/auth.service";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    login(email, password);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="Login">
      <HSpacer height="96px" />
      <Logo />
      <HSpacer height="48px" />
      <Title>Login</Title>
      <HSpacer height="16px" />
      <form>
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
        <Button onClick={handleLogin}>Entrar</Button>
      </form>
      <HSpacer height="16px" />
      <Link href={AppRoutes.Register}>Não tem conta? Se cadastre aqui.</Link>
    </div>
  );
}

export { Login };
