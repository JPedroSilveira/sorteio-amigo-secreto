import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/button";
import { Card } from "../../components/card/card";
import { HSpacer } from "../../components/spacer/spacer";
import { Subtitle } from "../../components/text/subtitle/subtitle";
import { Text } from "../../components/text/text";
import { Title } from "../../components/text/title/title";
import { AppRoutes } from "../../constants/routes.constants";
import { LoaderContext } from "../../context/loader/loader.context";
import { GroupService } from "../../services/group.service";
import "./my-groups.css";

function MyGroups() {
  const navigate = useNavigate();
  const { executeWithLoading } = useContext(LoaderContext);
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    let updateGroups = (groups) => {
      setGroups(groups);
    };
    async function fetchData() {
      const groups = await executeWithLoading(GroupService.getAll());
      updateGroups(groups);
    }
    fetchData();

    return () => {
      updateGroups = () => {};
    };
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
          <div key={index}>
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
