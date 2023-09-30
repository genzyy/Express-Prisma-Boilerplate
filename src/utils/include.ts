const include = <Type, Key extends keyof Type>(keys: Key[]): object => {
  return Object.fromEntries(keys.map((key) => [key, true]));
};

export default include;
