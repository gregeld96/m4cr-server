export const omit = <T extends Object>(
  obj: T,
  keys: (keyof T)[]
) => {
  const clone = { ...obj };
  for (const key of keys) {
    delete clone[key];
  }

  return clone;
};
