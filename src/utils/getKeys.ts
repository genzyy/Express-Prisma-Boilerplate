const getKeys = (keys: any[]): object => {
  return Object.fromEntries(keys.map((key) => [key, true]));
};

export default getKeys;
