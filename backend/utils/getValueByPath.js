exports.getValueByPath = function (obj, path) {
  try {
    return path.split('.').reduce((acc, part) => {
      const match = part.match(/(\w+)\[(\d+)\]/);
      if (match) {
        const [_, key, index] = match;
        return acc?.[key]?.[+index];
      }
      return acc?.[part];
    }, obj);
  } catch {
    return null;
  }
}
