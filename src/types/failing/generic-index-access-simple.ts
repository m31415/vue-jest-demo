// Generic + index access - SIMPLEST case, no other features
type Block<P> = {
  props: P;
};

type DataProps = {
  title: string;
  count: number;
};

export type Data = Block<DataProps>;
