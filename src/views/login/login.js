import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { Logo } from "../../components/logo/logo";
import { HSpacer } from "../../components/spacer/spacer";
import { Link } from "../../components/text/link/link";
import { Title } from "../../components/text/title/title";
import { AppRoutes } from "../../constants/routes.constants";
import { login } from "../../services/auth.service";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    const isLogged = login(phone, password);
    if (!isLogged) {
      setLoginError("Login inválido!");
    } else {
      navigate(AppRoutes.MyGroups);
    }
  }

  function handlePhoneChange(e) {
    if (loginError) setLoginError("");
    setPhone(e.target.value);
  }

  function handlePasswordChange(e) {
    if (loginError) setLoginError("");
    setPassword(e.target.value);
  }

  return (
    <div className="Login">
      <HSpacer height="62px" />
      <Logo />
      <HSpacer height="14px" />
      <Title>Login</Title>
      <HSpacer height="16px" />
      <form>
        <Input
          value={phone}
          onChange={handlePhoneChange}
          label="Telefone"
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
          error={loginError}
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
