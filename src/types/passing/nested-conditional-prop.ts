// Nested conditional types within a single prop
type ExtractArray<T> = T extends Array<infer U> ? U : T;
type ExtractString<T> = T extends string ? T : never;

export type Data = {
  title: string;
  // Nested conditional: extract element from array, then ensure it's a string
  item: ExtractString<ExtractArray<string[]>>;
};
