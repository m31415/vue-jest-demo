// Mapped type for SINGLE prop - testing if it works for individual props
type OriginalData = {
  name: string;
  age: number;
};

type ReadonlyData = {
  readonly [K in keyof OriginalData]: OriginalData[K];
};

export type Data = {
  title: string;
  userData: ReadonlyData;  // Mapped type for single prop
};
