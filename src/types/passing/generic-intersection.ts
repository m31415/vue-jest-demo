// Generic + intersection type - NO index access
type BaseProps = {
  title: string;
};

type ExtendedProps = {
  count: number;
};

type PassThrough<T> = T;

export type Data = PassThrough<BaseProps & ExtendedProps>;
