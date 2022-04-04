import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../components/button/button";
import { Card } from "../../components/card/card";
import { HSpacer } from "../../components/spacer/spacer";
import { Subtitle } from "../../components/text/subtitle/subtitle";
import { Text } from "../../components/text/text";
import { Title } from "../../components/text/title/title";
import { AppRoutes } from "../../constants/routes.constants";
import {
  get_group,
  remove_group,
  sort_group,
} from "../../services/group.service";
import "./view-group.css";

function ViewGroup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [group, setGroup] = useState();

  useEffect(() => {
    const id = searchParams.get("id");
    const group = get_group(id);
    setGroup(group);
  }, [searchParams]);

  function handleSort() {
    sort_group(group.id);
    const updated_group = get_group(group.id);
    setGroup(updated_group);
  }

  function handleRemoveGroup() {
    remove_group(group.id);
    navigate(AppRoutes.MyGroups);
  }

  function handleBack() {
    navigate(AppRoutes.MyGroups);
  }

  function handleEditGroup() {
    // TODO
  }

  return (
    <div className="ViewGroup">
      {group && (
        <>
          <Title>{group.name}</Title>
          <Card>
            <Text>{group.members.length} participantes</Text>
            <HSpacer height="8px" />
            <Text>O amigo secreto será feito no dia {group.date}</Text>
            <Text>Valor mínimo: ${group.minValue}</Text>
            <Text>Valor máximo: ${group.maxValue}</Text>
            <HSpacer height="8px" />
          </Card>
          <HSpacer height="16px" />
          {group.sorted_member ? (
            <Subtitle>Seu amigo secreto é {group.sorted_member.name}</Subtitle>
          ) : (
            <Button onClick={handleSort}>Sortear amigo secreto</Button>
          )}
          <HSpacer height="16px" />
          <Card>
            <Subtitle>Lista de participantes</Subtitle>
            {group.members.map((member, index) => (
              <Text id={index}>
                {member.name} ({member.phone})
              </Text>
            ))}
          </Card>
          <HSpacer height="16px" />
          <Button onClick={handleBack}>Voltar</Button>
          <HSpacer height="16px" />
          <Button onClick={handleEditGroup}>Editar grupo</Button>
          <HSpacer height="8px" />
          <Button onClick={handleRemoveGroup}>Excluir grupo</Button>
          <HSpacer height="16px" />
        </>
      )}
    </div>
  );
}

export { ViewGroup };
