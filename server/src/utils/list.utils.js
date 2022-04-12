class ListUtils {
  static removeDuplicates(list, criteria) {
    const itemMap = new Map();
    list.forEach((item) => {
      const key = criteria(item);
      if (!itemMap.has(key)) {
        itemMap.set(key, item);
      }
    });
    return Array.from(itemMap.values());
  }
}

export { ListUtils };
