import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "../../components/bar/bar";
import { Button } from "../../components/button/button";
import { Card } from "../../components/card/card";
import { Input } from "../../components/input/input";
import { HSpacer } from "../../components/spacer/spacer";
import { TextArea } from "../../components/text-area/text-area";
import { Subtitle } from "../../components/text/subtitle/subtitle";
import { Text } from "../../components/text/text";
import { Title } from "../../components/text/title/title";
import { isNotEmpty } from "../../utils/obj";
import { AppRoutes } from "../../constants/routes.constants";
import { GroupService } from "../../services/group.service";
import "./create-group.css";

function CreateGroup() {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [date, setDate] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [wishes, setWishes] = useState("");
  const [members, setMembers] = useState([]);

  function handleSort(e) {
    e.preventDefault();
    GroupService.create_group_and_sort(
      groupName,
      date,
      minValue,
      maxValue,
      wishes,
      members
    );
    navigate(AppRoutes.MyGroups);
  }

  function handleSave(e) {
    e.preventDefault();
    GroupService.create_group(
      groupName,
      date,
      minValue,
      maxValue,
      wishes,
      members
    );
    navigate(AppRoutes.MyGroups);
  }

  function handleCancelGroup(e) {
    e.preventDefault();
    navigate(AppRoutes.MyGroups);
  }

  function handleWishesChange(e) {
    setWishes(e.target.value);
  }

  function handleAddMember(e) {
    e.preventDefault();
    if (isNotEmpty(memberName) && isNotEmpty(memberPhone)) {
      members.push({
        name: memberName,
        phone: memberPhone,
      });
      setMemberPhone("");
      setMemberName("");
      setMembers([...members]);
    }
  }

  function handleMemberNameChange(e) {
    setMemberName(e.target.value);
  }

  function handleMemberPhoneChange(e) {
    setMemberPhone(e.target.value);
  }

  function handleGroupNameChange(e) {
    setGroupName(e.target.value);
  }

  function handleDateChange(e) {
    setDate(e.target.value);
  }

  function handleMinValueChange(e) {
    setMinValue(e.target.value);
  }

  function handleMaxValueChange(e) {
    setMaxValue(e.target.value);
  }

  return (
    <div className="CreateGroup">
      <HSpacer height="16px" />
      <div className="CreateGroup_Title">
        <Title>Criar grupo</Title>
      </div>
      <form>
        <Text>Informações gerais</Text>
        <Card>
          <Input
            value={groupName}
            onChange={handleGroupNameChange}
            label="Nome do grupo"
            id="group-name"
            type="text"
          />
          <HSpacer height="16px" />
          <Input
            value={date}
            onChange={handleDateChange}
            label="Data do amigo secreto"
            id="date"
            type="date"
          />
          <HSpacer height="16px" />
          <Input
            value={minValue}
            onChange={handleMinValueChange}
            label="Valor mínimo"
            id="min-value"
            type="number"
          />
          <HSpacer height="16px" />
          <Input
            value={maxValue}
            onChange={handleMaxValueChange}
            label="Valor máximo"
            id="max-value"
            type="number"
          />
          <HSpacer height="8px" />
        </Card>
        <HSpacer height="4px" />
        <Text>Participantes</Text>
        <Card>
          <Input
            value={memberName}
            onChange={handleMemberNameChange}
            label="Nome do participante"
            id="member-name"
            type="text"
          />
          <HSpacer height="16px" />
          <Input
            value={memberPhone}
            onChange={handleMemberPhoneChange}
            label="Telefone do participante"
            id="member-phone"
            type="tel"
          />
          <HSpacer height="16px" />
          <Button onClick={handleAddMember}>Adicionar participante</Button>
          <HSpacer height="16px" />
          <Bar />
          <HSpacer height="4px" />
          <Subtitle>Lista de participantes</Subtitle>
          {members.map((member, index) => (
            <Text id={index}>
              {member.name} ({member.phone})
            </Text>
          ))}
        </Card>
        <HSpacer height="4px" />
        <Text>Presentes</Text>
        <Card>
          <TextArea
            id="wishes"
            label="Lista de desejos"
            onChange={handleWishesChange}
            cols="40"
            rows="10"
          >
            {wishes}
          </TextArea>
        </Card>
        <HSpacer height="0px" />
        <Button onClick={handleCancelGroup}>Cancelar grupo</Button>
        <HSpacer height="2px" />
        <Button onClick={handleSave}>Salvar informações</Button>
        <HSpacer height="2px" />
        <Button onClick={handleSort}>Sortear amigo secreto</Button>
        <HSpacer height="8px" />
      </form>
    </div>
  );
}

export { CreateGroup };
