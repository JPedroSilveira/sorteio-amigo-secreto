import { Objects } from "./object.utils";

class Strings {
  static parseMoneyToNumber(str) {
    if (Objects.isEmpty(str)) {
      return 0;
    }
    const strWithoutLeftZeros = str.replace(/^0+/, "");
    const strWithoutNegativeSign = strWithoutLeftZeros.replace("-", "");
    const floatValue = parseFloat(strWithoutNegativeSign);
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
