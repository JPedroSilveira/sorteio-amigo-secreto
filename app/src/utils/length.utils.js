class Length {
  static isGreaterOrEqual(obj, size) {
    return obj.length >= size;
  }
  static isSmaller(obj, size) {
    return !this.isGreaterOrEqual(obj, size);
  }
  static isEqual(obj, size) {
    return obj.length === size;
  }
  static isNotEqual(obj, size) {
    return !this.isEqual(obj, size);
  }
}

export { Length };
