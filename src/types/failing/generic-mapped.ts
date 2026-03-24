// Generic + mapped type - NO index access
type OriginalProps = {
  title: string;
  count: number;
};

type MappedProps = {
  [K in keyof OriginalProps]: OriginalProps[K];
};

type PassThrough<T> = T;

export type Data = PassThrough<MappedProps>;
