class Objects {
  static isNull(obj) {
    return obj === null;
  }
  static isUndefined(obj) {
    return obj === undefined;
  }
  static isNotUndefined(obj) {
    return !this.isUndefined(obj);
  }
  static isEmpty(obj) {
    return (
      obj === undefined ||
      obj === null ||
      obj === "" ||
      obj.length === 0 ||
      (this.isObject(obj) && Object.keys(obj).length === 0)
    );
  }
  static isNotEmpty(obj) {
    return !this.isEmpty(obj);
  }
  static isDeeplyEmpty(obj) {
    if (!this.isObject(obj) && this.isNotEmpty(obj)) {
      return false;
    }
    const keys = Object.keys(obj);
    return keys.every((key) => this.isDeeplyEmpty(obj[key]));
  }
  static isDeeplyNotEmpty(obj) {
    return !this.isDeeplyEmpty(obj);
  }
  static isNumber(obj) {
    return typeof obj === "number";
  }
  static isString(obj) {
    return typeof obj === "string";
  }
  static isObject(obj) {
    return typeof obj === "object";
  }
  static isEqual(obj1, obj2) {
    return obj1 === obj2;
  }
  static isNotEqual(obj1, obj2) {
    return !this.isEqual(obj1, obj2);
  }
  static safeGet(obj, func) {
    if (this.isNotEmpty(obj)) {
      return func(obj);
    }
    return null;
  }
}

export { Objects };
