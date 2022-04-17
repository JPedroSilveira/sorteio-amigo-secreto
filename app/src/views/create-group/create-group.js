import { useContext, useState } from "react";
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
import { Objects } from "../../utils/object.utils";
import { AppRoutes } from "../../constants/routes.constants";
import { GroupService } from "../../services/group.service";
import { LoaderContext } from "../../context/loader/loader.context";
import { Error } from "../../components/text/error/error";
import { Strings } from "../../utils/string.utils";
import { ListItem } from "../../components/list/list-item/list-item";
import { AuthService } from "../../services/auth.service";
import "./create-group.css";

function CreateGroup() {
  const navigate = useNavigate();
  const { executeWithLoading } = useContext(LoaderContext);
  const [user] = useState(AuthService.getUser());
  const [groupName, setGroupName] = useState("");
  const [date, setDate] = useState("");
  const [minValue, setMinValue] = useState(0.0);
  const [maxValue, setMaxValue] = useState(0.0);
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [wishes, setWishes] = useState("");
  const [members, setMembers] = useState([user]);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  function updateErrors() {
    setErrors({ ...errors });
  }

  function cleanMemberFields() {
    setMemberName("");
    setMemberPhone("");
  }

  function createGroupFromState() {
    const userMember = members.find((m) => m.phone === user.phone);
    if (Objects.isNotEmpty(userMember)) {
      userMember.wishes = wishes;
    }
    return {
      name: groupName,
      date: date,
      minValue: Strings.parseMoneyToNumber(minValue),
      maxValue: Strings.parseMoneyToNumber(maxValue),
      members: members,
    };
  }

  async function handleSort(e) {
    e.preventDefault();
    const group = createGroupFromState();
    const errors = GroupService.isValidGroup(group);
    if (Objects.isEmpty(errors)) {
      const error = await executeWithLoading(GroupService.createAndSort(group));
      if (Objects.isEmpty(error)) {
        navigate(AppRoutes.MyGroups);
      } else {
        setError(error);
      }
    } else {
      setErrors(errors);
    }
    cleanMemberFields();
  }

  async function handleSave(e) {
    e.preventDefault();
    const group = createGroupFromState();
    const errors = GroupService.isValidGroup(group);
    if (Objects.isEmpty(errors)) {
      const error = await executeWithLoading(GroupService.create(group));
      if (Objects.isNotEmpty(error) && Objects.isString(error)) {
        setError(error);
      } else {
        navigate(AppRoutes.MyGroups);
      }
    } else {
      setErrors(errors);
    }
    cleanMemberFields();
  }

  function handleCancelGroup(e) {
    e.preventDefault();
    navigate(AppRoutes.MyGroups);
  }

  function handleAddMember(e) {
    e.preventDefault();
    const member = {
      name: memberName,
      phone: memberPhone,
    };
    const errors = GroupService.isValidMember(member, members);
    if (Objects.isEmpty(errors)) {
      members.push({
        name: memberName,
        phone: memberPhone,
      });
      setMembers([...members]);
      cleanMemberFields();
    } else {
      setErrors(errors);
    }
  }

  function handleRemoveMember(phone) {
    const updatedMembers = members.filter((member) => member.phone !== phone);
    setMembers([...updatedMembers]);
  }

  function handleWishesChange(e) {
    setWishes(e.target.value);
  }

  function handleMemberNameChange(e) {
    errors.memberName = "";
    updateErrors();
    setMemberName(e.target.value);
  }

  function handleMemberPhoneChange(e) {
    errors.memberPhone = "";
    updateErrors();
    setMemberPhone(e.target.value);
  }

  function handleGroupNameChange(e) {
    errors.name = "";
    updateErrors();
    setGroupName(e.target.value);
  }

  function handleDateChange(e) {
    errors.date = "";
    updateErrors();
    setDate(e.target.value);
  }

  function handleMinValueChange(e) {
    errors.minValue = "";
    updateErrors();
    const newValue = Strings.parseMoneyToNumber(e.target.value);
    if (Objects.isNotEmpty(newValue)) {
      setMinValue(Strings.parseNumberToString(newValue));
    }
  }

  function handleMaxValueChange(e) {
    errors.maxValue = "";
    updateErrors();
    const newValue = Strings.parseMoneyToNumber(e.target.value);
    if (Objects.isNotEmpty(newValue)) {
      setMaxValue(Strings.parseNumberToString(newValue));
    }
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
            error={errors.name}
          />
          <HSpacer height="16px" />
          <Input
            value={date}
            onChange={handleDateChange}
            label="Data do amigo secreto"
            id="date"
            type="date"
            error={errors.date}
          />
          <HSpacer height="16px" />
          <Input
            value={minValue}
            onChange={handleMinValueChange}
            label="Valor mínimo (Ex.: 5,00)"
            id="min-value"
            type="number"
            error={errors.minValue}
          />
          <HSpacer height="16px" />
          <Input
            value={maxValue}
            onChange={handleMaxValueChange}
            label="Valor máximo (Ex.: 25,00)"
            id="max-value"
            type="number"
            error={errors.maxValue}
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
            error={errors.memberName}
          />
          <HSpacer height="16px" />
          <Input
            value={memberPhone}
            onChange={handleMemberPhoneChange}
            label="Telefone do participante"
            id="member-phone"
            type="tel"
            error={errors.memberPhone}
          />
          <HSpacer height="16px" />
          <Button onClick={handleAddMember}>Adicionar participante</Button>
          <Error center>{errors.members}</Error>
          <HSpacer height="16px" />
          <Bar />
          <HSpacer height="4px" />
          <Subtitle>Lista de participantes</Subtitle>
          {members.map((member, index) => (
            <ListItem
              key={index}
              id={member.phone}
              onClick={handleRemoveMember}
            >
              <Text>
                {member.phone === user.phone ? "[Você]" : ""} {member.name} (
                {member.phone})
              </Text>
            </ListItem>
          ))}
        </Card>
        {members.some((m) => m.phone === user.phone) && (
          <>
            <HSpacer height="4px" />
            <Text>Presentes</Text>
            <Card>
              <TextArea
                id="wishes"
                label="Sua lista de desejos"
                onChange={handleWishesChange}
                cols="40"
                rows="10"
              >
                {wishes}
              </TextArea>
            </Card>
          </>
        )}
        <HSpacer height="8px" />
        <Button onClick={handleCancelGroup}>Cancelar grupo</Button>
        <HSpacer height="2px" />
        <Button onClick={handleSave}>Salvar informações</Button>
        <HSpacer height="2px" />
        <Button onClick={handleSort}>Sortear amigo secreto</Button>
        <Error center>{error}</Error>
        <Error center>
          {Objects.isDeeplyNotEmpty(errors)
            ? "Erros encontrados nos campos acima"
            : ""}
        </Error>
        <HSpacer height="8px" />
      </form>
    </div>
  );
}

export { CreateGroup };
