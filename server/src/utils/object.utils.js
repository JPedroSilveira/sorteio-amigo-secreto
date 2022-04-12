class ObjectUtils {
  static isEmpty(obj) {
    return obj === undefined || obj === null || obj === "" || obj.length === 0;
  }
  static isNotEmpty(obj) {
    return !this.isEmpty(obj);
  }
  static isNumber(obj) {
    return typeof obj === "number";
  }
  static isString(obj) {
    return typeof obj === "string";
  }
}

export { ObjectUtils };
