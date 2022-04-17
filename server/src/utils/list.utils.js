class List {
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
  static getRandom(list) {
    return list[this.getRandomIndex(list)];
  }
  static getRandomIndex(list) {
    return Math.floor(Math.random() * list.length);
  }
  static sortRandomly(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}

export { List };
