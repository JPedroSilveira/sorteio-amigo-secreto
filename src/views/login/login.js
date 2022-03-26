import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { Logo } from "../../components/logo/logo";
import { HSpacer } from "../../components/spacer/spacer";
import { Link } from "../../components/text/link";
import { Title } from "../../components/text/title";
import { AppRoutes } from "../../constants/routes.constants";
import "./login.css";

function Login() {
  return (
    <div className="Login">
      <HSpacer height="96px" />
      <Logo />
      <HSpacer height="48px" />
      <Title>Login</Title>
      <HSpacer height="16px" />
      <form>
        <Input label="Email" id="username" type="text" />
        <HSpacer height="8px" />
        <Input label="Senha" id="password" type="password" />
        <HSpacer height="8px" />
        <Button>Entrar</Button>
      </form>
      <HSpacer height="16px" />
      <Link href={AppRoutes.Register}>Não tem conta? Se cadastre aqui.</Link>
    </div>
  );
}

export { Login };
