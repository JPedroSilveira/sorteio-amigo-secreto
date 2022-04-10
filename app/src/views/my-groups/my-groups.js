import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/button";
import { Card } from "../../components/card/card";
import { HSpacer } from "../../components/spacer/spacer";
import { Subtitle } from "../../components/text/subtitle/subtitle";
import { Text } from "../../components/text/text";
import { Title } from "../../components/text/title/title";
import { AppRoutes } from "../../constants/routes.constants";
import { GroupService } from "../../services/group.service";
import "./my-groups.css";

function MyGroups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState();

  useEffect(() => {
    const groups = GroupService.get_all_groups();
    setGroups(groups);
  }, []);

  function handleOnCreateGroup() {
    navigate(AppRoutes.CreateGroup);
  }

  function handleOpenGroup(id) {
    navigate(`${AppRoutes.ViewGroup}?id=${id}`);
  }

  function handleLogout() {
    navigate(AppRoutes.Logout);
  }

  return (
    <div className="MyGroups">
      <HSpacer height="16px" />
      <Title>Seus grupos</Title>
      {groups &&
        groups.map((group, index) => (
          <div id={index}>
            <Card>
              <Subtitle>{group.name}</Subtitle>
              <Text>{group.members.length} participantes</Text>
              <HSpacer height="8px" />
              <Text>O amigo secreto será feito no dia {group.date}</Text>
              <HSpacer height="8px" />
              <Button onClick={() => handleOpenGroup(group.id)}>
                Ver grupo
              </Button>
            </Card>
            <HSpacer height="16px" />
          </div>
        ))}
      <Button onClick={handleOnCreateGroup}>Criar grupo</Button>
      <HSpacer height="8px" />
      <Button onClick={handleLogout}>Sair</Button>
      <HSpacer height="16px" />
    </div>
  );
}

export { MyGroups };
