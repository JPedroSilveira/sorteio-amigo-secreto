import { Input } from "../../components/input/input";
import "./login.css";

function Login() {
  return (
    <div className="Login">
      <form>
        <Input label="Email" id="username" type="text" />
        <Input label="Senha" id="password" type="password" />
      </form>
    </div>
  );
}

export { Login };
