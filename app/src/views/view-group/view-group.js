import { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../components/button/button";
import { Card } from "../../components/card/card";
import { HSpacer } from "../../components/spacer/spacer";
import { Error } from "../../components/text/error/error";
import { Subtitle } from "../../components/text/subtitle/subtitle";
import { Text } from "../../components/text/text";
import { Title } from "../../components/text/title/title";
import { AppRoutes } from "../../constants/routes.constants";
import { GroupService } from "../../services/group.service";
import { Dates } from "../../utils/date.utils";
import { Objects } from "../../utils/object.utils";
import { Strings } from "../../utils/string.utils";
import { Utils } from "../../utils/utils";
import { DialogContext } from "../../context/dialog/dialog.context";
import { EditMembers } from "./edit-members/edit-members";
import { EditInfo } from "./edit-info/edit-info";
import { LoaderContext } from "../../context/loader/loader.context";
import { AuthService } from "../../services/auth.service";
import "./view-group.css";
import { TextArea } from "../../components/text-area/text-area";

function ViewGroup() {
  const navigate = useNavigate();
  const { executeWithLoading } = useContext(LoaderContext);
  const { display, setOnHideListenner } = useContext(DialogContext);
  const [searchParams] = useSearchParams();
  const [user] = useState(AuthService.getUser());
  const [isOwner, setIsOwner] = useState(false);
  const [group, setGroup] = useState();
  const [wishes, setWishes] = useState("");
  const [wishesError, setWishesError] = useState("");
  const [errors, setErrors] = useState("");
  const [refreshGroup, setRefreshGroup] = useState(0);
  const [shouldShowSecretFriend, setShouldShowSecretFriend] = useState(false);

  useEffect(() => {
    let updateGroup = (group) => {
      const userPhone = AuthService.getUserPhone();
      setIsOwner(userPhone === group.owner);
      setGroup(group);

      const userMember = group.members.find((m) => m.phone === userPhone);
      if (Objects.isNotEmpty(userMember)) {
        setWishes(userMember.wishes);
      }
    };

    let updateFatalError = async (error) => {
      setErrors({
        fatal: error,
      });
      await Utils.sleep(2500);
      navigate(AppRoutes.MyGroups);
    };

    const fetchData = async () => {
      const id = Strings.parseInt(searchParams.get("id"));
      if (isNaN(id)) {
        updateFatalError("Grupo inválido, retornando ao menu");
      } else {
        const groupOrError = await executeWithLoading(GroupService.get(id));
        if (
          Objects.isNotEmpty(groupOrError) &&
          Objects.isString(groupOrError)
        ) {
          updateFatalError(groupOrError);
        } else {
          updateGroup(groupOrError);
        }
      }
    };

    fetchData();

    //TODO: Fix it to create a real listenner
    setOnHideListenner(() => {});

    return () => {
      updateGroup = () => {};
      updateFatalError = () => {};
    };
  }, [searchParams, navigate, refreshGroup, setOnHideListenner]);

  async function handleSaveWishes() {
    const error = await executeWithLoading(
      GroupService.saveWishes(group.id, wishes)
    );
    if (Objects.isNotEmpty(error)) {
      setWishesError(error);
    }
  }

  function handleWishesChange(e) {
    setWishes(e.target.value);
  }

  function handleAddMember() {
    display(<EditMembers group={group} />);
  }

  async function handleSort() {
    const error = await GroupService.sort(group.id);
    if (Objects.isNotEmpty(error)) {
      setErrors({
        sort: error,
      });
    } else {
      setRefreshGroup(refreshGroup + 1);
    }
  }

  async function handleRemoveGroup() {
    const error = await GroupService.delete(group.id);
    if (Objects.isNotEmpty(error)) {
      setErrors({
        delete: error,
      });
    } else {
      navigate(AppRoutes.MyGroups);
    }
  }

  function handleBack() {
    navigate(AppRoutes.MyGroups);
  }

  function handleEditInfo() {
    display(<EditInfo group={group} />);
  }

  function handleShowSecretFriend() {
    setShouldShowSecretFriend(true);
  }

  function handleHideSecretFriend() {
    setShouldShowSecretFriend(false);
  }

  return (
    <div className="ViewGroup">
      <Error>{errors.fatal}</Error>
      {group && (
        <>
          <Title>{group.name}</Title>
          <Card>
            <Text>{group.members.length} participantes</Text>
            <Text>
              O amigo secreto será feito no dia {Dates.formatDate(group.date)}
            </Text>
            <HSpacer height="8px" />
            <Text>
              Valor mínimo: {Strings.parseNumberToMoneyString(group.minValue)}
            </Text>
            <Text>
              Valor máximo: {Strings.parseNumberToMoneyString(group.maxValue)}
            </Text>
            {!group.secretFriend && isOwner && (
              <>
                <HSpacer height="4px" />
                <Button onClick={handleEditInfo}>Editar informações</Button>
              </>
            )}
            <HSpacer height="8px" />
          </Card>
          <HSpacer height="16px" />
          {group.secretFriend ? (
            <Card>
              {shouldShowSecretFriend ? (
                <>
                  <Subtitle>
                    Seu amigo secreto é: {group.secretFriend.name}
                  </Subtitle>
                  {group.secretFriend.wishes && (
                    <>
                      <TextArea
                        id="wishes"
                        label="Lista de desejos"
                        disabled
                        cols="40"
                        rows="10"
                      >
                        {group.secretFriend.wishes}
                      </TextArea>
                      <HSpacer height="16px" />
                    </>
                  )}
                  <Button onClick={handleHideSecretFriend}>
                    Esconder amigo secreto
                  </Button>
                </>
              ) : (
                <Button onClick={handleShowSecretFriend}>
                  Ver meu amigo secreto
                </Button>
              )}
            </Card>
          ) : (
            <>
              {isOwner && (
                <>
                  <Button onClick={handleSort}>Sortear amigo secreto</Button>
                  <Error center>{errors.sort}</Error>
                </>
              )}
            </>
          )}
          <HSpacer height="16px" />
          <Card>
            <Subtitle>Lista de participantes</Subtitle>
            {group.members.map((member, index) => (
              <Text key={index}>
                {member.name} ({member.phone})
              </Text>
            ))}
            {!group.secretFriend && isOwner && (
              <>
                <HSpacer height="16px" />
                <Button onClick={handleAddMember}>Alterar participantes</Button>
              </>
            )}
          </Card>
          {group.members.some((m) => m.phone === user.phone) && (
            <>
              <HSpacer height="16px" />
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
                <HSpacer height="16px" />
                <Button onClick={handleSaveWishes}>Salvar desejos</Button>
                <Error center>{wishesError}</Error>
              </Card>
            </>
          )}
          <HSpacer height="16px" />
          <Button onClick={handleBack}>Voltar</Button>
          <HSpacer height="16px" />
          <HSpacer height="8px" />
          {isOwner && (
            <Button onClick={handleRemoveGroup}>Excluir grupo</Button>
          )}
          <Error center>{errors.delete}</Error>
          <HSpacer height="16px" />
        </>
      )}
    </div>
  );
}

export { ViewGroup };
