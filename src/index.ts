type SnakeToCamelCase<S extends string | number | symbol> =
  S extends `${infer T}_${infer U}`
    ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
    : S;

type CamelToSnakeCase<S extends string | number | symbol> =
  S extends `${infer T}${infer U}`
    ? `${T extends Capitalize<T>
      ? "_"
      : ""}${Lowercase<T>}${CamelToSnakeCase<U>}`
    : S;

export const snakeToCamel = <T extends string>(str: T): SnakeToCamelCase<T> => {
  return str
    .toLowerCase()
    .replace(/([-_][a-z])/g, group =>
      group.toUpperCase().replace("-", "").replace("_", ""),
    ) as SnakeToCamelCase<T>;
};

//@ts-ignore
export const SnakeToCamelObjectKeys = <T extends object>(obj: T): {[K in SnakeToCamelCase<keyof T>]: T[CamelToSnakeCase<K>]} => (
  Object.assign({}, ...Object.entries(obj).map(([k, v]) => ({
      [snakeToCamel(k)]: v,
  })))
);