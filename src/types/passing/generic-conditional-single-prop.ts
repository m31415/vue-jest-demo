// Generic + conditional type for a single prop
type Nullable<T> = T | null;
type ExtractNonNull<T> = T extends null ? never : T;

type Block<T> = {
  props: {
    title: string;
    value: ExtractNonNull<Nullable<T>>;  // Conditional for single prop
  };
};

export type Data = Block<string>;
