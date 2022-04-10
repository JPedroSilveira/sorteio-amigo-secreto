import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/routes.constants";
import { AuthService } from "../../services/auth.service";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.logout();
    navigate(AppRoutes.Login);
  }, [navigate]);

  return <></>;
}

export { Logout };
