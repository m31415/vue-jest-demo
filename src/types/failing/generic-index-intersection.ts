// Generic + Intersection type
type BaseProps = {
  title: string;
};

type ExtendedProps = {
  count: number;
};

type Block<T> = {
  props: T;
};

export type Data = Block<BaseProps & ExtendedProps>;
