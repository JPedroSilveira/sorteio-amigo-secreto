import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/button";
import { HSpacer } from "../../components/spacer/spacer";
import { Title } from "../../components/text/title";
import { AppRoutes } from "../../constants/routes.constants";
import "./my-groups.css";

function MyGroups() {
  const navigate = useNavigate();

  function handleOnCreateGroup() {
    navigate(AppRoutes.CreateGroup);
  }

  return (
    <div className="MyGroups">
      <HSpacer height="16px" />
      <Title>Seus grupos</Title>
      <Button onClick={handleOnCreateGroup}>Criar grupo</Button>
    </div>
  );
}

export { MyGroups };
