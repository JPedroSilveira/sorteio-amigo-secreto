import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/routes.constants";
import { AuthService } from "../../services/auth.service";

function PublicRoute(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (AuthService.is_logged_in()) {
      navigate(AppRoutes.MyGroups);
    }
  }, [navigate]);

  return props.children;
}

export { PublicRoute };
