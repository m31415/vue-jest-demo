// Index access + intersection type - NO generic
type BaseProps = {
  title: string;
};

type ExtendedProps = {
  count: number;
};

type Container = {
  props: BaseProps & ExtendedProps;
};

export type Data = Container;
