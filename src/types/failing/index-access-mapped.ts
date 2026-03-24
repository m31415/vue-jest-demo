// Index access + mapped type - NO generic
type OriginalProps = {
  title: string;
  count: number;
};

type MappedProps = {
  [K in keyof OriginalProps]: OriginalProps[K];
};

type Container = {
  props: MappedProps;
};

export type Data = Container;
