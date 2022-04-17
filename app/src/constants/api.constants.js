const BaseUrl = "http://localhost:3001";
const BaseUser = `${BaseUrl}/user`;
const BaseGroup = `${BaseUrl}/group`;

const API = {
  Base: BaseUrl,
  User: {
    Register: `${BaseUser}/register`,
    Login: `${BaseUser}/login`,
    Current: `${BaseUser}/current`,
  },
  Group: {
    Create: BaseGroup,
    GetAll: `${BaseGroup}/all`,
    Get: BaseGroup,
    Update: BaseGroup,
    Delete: BaseGroup,
    Sort: `${BaseGroup}/sort`,
    Wishes: `${BaseGroup}/wishes`,
  },
};

export { API };
