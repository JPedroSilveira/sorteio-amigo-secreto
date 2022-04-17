import fs from "fs";

class Stores {
  static generateStoreManager(key) {
    return {
      apply: (exec) => {
        const data = Private.readStore(key);
        exec(data);
        Private.saveStore(key, data);
      },
      read: () => {
        return Private.readStore(key);
      },
    };
  }
}

class Private {
  static readStore(key) {
    const content = fs.readFileSync(`./store/${key}.json`);
    return JSON.parse(content, this.reviver);
  }
  static saveStore(key, content) {
    fs.writeFileSync(
      `./store/${key}.json`,
      JSON.stringify(content, this.replacer)
    );
  }
  static replacer(key, value) {
    if (value instanceof Map) {
      return {
        dataType: "Map",
        value: Array.from(value.entries()),
      };
    } else {
      return value;
    }
  }
  static reviver(key, value) {
    if (typeof value === "object" && value !== null) {
      if (value.dataType === "Map") {
        return new Map(value.value);
      }
    }
    return value;
  }
}

export { Stores };
