class Objects {
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
  static isEqual(obj1, obj2) {
    return obj1 === obj2;
  }
  static isNotEqual(obj1, obj2) {
    return !this.isEqual(obj1, obj2);
  }
}

export { Objects };
