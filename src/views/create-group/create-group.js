import { useState } from "react";
import { Bar } from "../../components/bar/bar";
import { TextBar } from "../../components/bar/text-bar/text";
import { Button } from "../../components/button/button";
import { FormCard } from "../../components/card/form/form-card";
import { Input } from "../../components/input/input";
import { HSpacer } from "../../components/spacer/spacer";
import { TextArea } from "../../components/text-area/text-area";
import { Subtitle } from "../../components/text/subtitle/subtitle";
import { Text } from "../../components/text/text";
import { Title } from "../../components/text/title/title";
import { isNotEmpty } from "../../utils/obj";
import "./create-group.css";

function CreateGroup() {
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
    // TODO: sortear amigo secreto
  }

  function handleSave(e) {
    e.preventDefault();
    // TODO: salvar amigo secreto
  }

  function handleCancelGroup(e) {
    e.preventDefault();
    // TODO: cancelar amigo secreto
  }

  function handleChooseFile(e) {
    e.preventDefault();
    // TODO: carregar texto por arquivo
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
        <FormCard>
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
        </FormCard>
        <HSpacer height="4px" />
        <Text>Participantes</Text>
        <FormCard>
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
          {members.map((member) => (
            <Text>
              {member.name} ({member.phone})
            </Text>
          ))}
        </FormCard>
        <HSpacer height="4px" />
        <Text>Lista de desejos</Text>
        <FormCard>
          <TextArea
            id="wishes"
            label="Lista de desejos"
            onChange={handleWishesChange}
            cols="40"
            rows="10"
          >
            {wishes}
          </TextArea>
          <TextBar text="OU" />
          <Button onClick={handleChooseFile}>Escolha um arquivo</Button>
        </FormCard>
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
