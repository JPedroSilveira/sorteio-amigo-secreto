import { Objects } from "./object.utils";

class Strings {
  static removeNonNumericCharacters(str) {
    return str.replace(/[^0-9]/g, "");
  }

  static parseMoneyToNumber(str) {
    if (Objects.isEmpty(str)) {
      return 0;
    }
    const filteredStr = str.replace(/^0+/, "").replace("-", "");

    const floatValue = parseFloat(filteredStr);
    if (isNaN(floatValue)) {
      return null;
    }
    return floatValue;
  }

  static parseNumberToMoneyString(number) {
    const formatter = new Intl.NumberFormat("pr-Br", {
      style: "currency",
      currency: "BRL",
    });
    return formatter.format(number);
  }

  static parseNumberToString(number) {
    return number.toString();
  }

  static parseInt(str) {
    return parseInt(str);
  }
}

export { Strings };
