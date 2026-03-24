// Union type containing conditional types
type StringOrNumber<T> = T extends string ? string : number;

export type Data = {
  title: string;
  value: StringOrNumber<string> | StringOrNumber<number>;  // Union of conditionals
};
