import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/routes.constants";
import { is_logged_in } from "../../services/auth.service";

function PublicRoute(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (is_logged_in()) {
      navigate(AppRoutes.MyGroups);
    }
  }, [navigate]);

  return props.children;
}

export { PublicRoute };
