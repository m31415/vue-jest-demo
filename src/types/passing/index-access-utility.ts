// Index access + utility type - NO generic
type FullProps = {
  title: string;
  description: string;
  internal: number;
};

type Container = {
  props: Pick<FullProps, 'title' | 'description'>;
};

export type Data = Container;
