import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/routes.constants";
import { logout } from "../../services/auth.service";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate(AppRoutes.Login);
  }, [navigate]);

  return <></>;
}

export { Logout };
