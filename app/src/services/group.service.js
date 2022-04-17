import axios from "axios";
import { API } from "../constants/api.constants";
import { Objects } from "../utils/object.utils";
import { Length } from "../utils/length.utils";

class GroupService {
  static async createAndSort(group) {
    const idOrError = await this.create(group);
    if (Objects.isNumber(idOrError)) {
      await this.sort(idOrError);
    } else {
      return idOrError;
    }
  }

  static async sort(id) {
    try {
      await axios.put(`${API.Group.Sort}?id=${id}`);
    } catch (_) {
      return "Desculpe, um erro inesperado ocorreu. Por favor, tente novamente.";
    }
  }

  static async create(group) {
    try {
      const response = await axios.post(API.Group.Create, group);
      return response.data.id;
    } catch (_) {
      return "Desculpe, um erro inesperado ocorreu. Por favor, tente novamente.";
    }
  }

  static async update(group) {
    try {
      if (
        Objects.isEmpty(group.members) ||
        Length.isSmaller(group.members, 3)
      ) {
        return "Necessário no mínimo três participantes";
      }
      await axios.put(API.Group.Update, group);
    } catch (_) {
      return "Desculpe, um erro inesperado ocorreu. Por favor, tente novamente.";
    }
  }

  static async delete(id) {
    try {
      await axios.delete(`${API.Group.Delete}?id=${id}`);
    } catch (_) {
      return "Desculpe, um erro inesperado ocorreu. Por favor, tente novamente.";
    }
  }

  static async getAll() {
    try {
      const response = await axios.get(API.Group.GetAll);
      return response.data;
    } catch (_) {
      return "Desculpe, um erro inesperado ocorreu. Por favor, recarregue a página.";
    }
  }

  static async get(id) {
    try {
      const response = await axios.get(`${API.Group.Get}?id=${id}`);
      return response.data;
    } catch (_) {
      return "Desculpe, um erro inesperado ocorreu. Voltando ao menu.";
    }
  }

  static async saveWishes(id, wishes) {
    try {
      await axios.put(`${API.Group.Wishes}?id=${id}`, {
        wishes: wishes,
      });
    } catch (_) {
      return "Desculpe, um erro inesperado ocorreu. Por favor, tente novamente.";
    }
  }

  static isValidMember(member, members) {
    const errors = {};
    if (members.some((m) => Objects.isEqual(m.phone, member.phone))) {
      errors.memberPhone = "Telefone já adicionado";
      return errors;
    }
    if (Objects.isEmpty(member.name)) {
      errors.memberName = "Membro deve possuir nome";
    }
    if (Objects.isEmpty(member.phone) || Length.isNotEqual(member.phone, 11)) {
      errors.memberPhone = "Telefone deve possuir 11 dígitos";
    }
    return errors;
  }

  static isValidGroup(group) {
    const errors = {};

    if (Objects.isEmpty(group.members) || Length.isSmaller(group.members, 3)) {
      errors.members = "Necessário no mínimo três participantes";
    }

    if (Objects.isEmpty(group.name)) {
      errors.name = "Necessário definir um nome para o grupo";
    }
    if (Objects.isEmpty(group.date)) {
      errors.date = "Necessário definir uma data";
    }
    if (Objects.isEmpty(group.minValue)) {
      errors.minValue = "Necessário definir um valor mínimo";
    }
    if (Objects.isEmpty(group.maxValue)) {
      errors.maxValue = "Necessário definir um valor máximo";
    }

    if (isNaN(group.minValue)) {
      errors.minValue = "Valor mínimo deve ser um número válido";
    }

    if (isNaN(group.maxValue)) {
      errors.maxValue = "Valor mínimo deve ser um número válido";
    }

    if (
      !isNaN(group.minValue) &&
      !isNaN(group.maxValue) &&
      group.maxValue < group.minValue
    ) {
      errors.maxValue = "Valor máximo deve ser maior ou igual ao mínimo";
    }

    return errors;
  }
}

export { GroupService };
