import axios from "axios";
import HttpStatus from "http-status";
import { API } from "../constants/api.constants";
import { AuthService } from "../services/auth.service";
import { Objects } from "../utils/object.utils";

class AxiosInterceptor {
  static setup() {
    axios.interceptors.request.use(
      (request) => {
        Private.addAPICredentialsIfNecessary(request);
        return request;
      },
      (error) => Promise.reject(error)
    );

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        Private.testAPICredentialsError(error);
        return Promise.reject(error);
      }
    );
  }
}

class Private {
  static testAPICredentialsError(error) {
    if (this.isAPIUrl(error.response.request.responseURL)) {
      if (error.response.status === HttpStatus.UNAUTHORIZED) {
        AuthService.logout();
        window.location.reload();
      }
    }
  }
  static addAPICredentialsIfNecessary(request) {
    if (this.isAPIUrl(request.url)) {
      const token = AuthService.getToken();
      if (Objects.isNotEmpty(token)) {
        request.headers["authorization"] = token;
      }
    }
  }
  static isAPIUrl(url) {
    return url.startsWith(API.Base);
  }
}

export { AxiosInterceptor };
