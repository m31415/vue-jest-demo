// Generic + Utility type
type FullProps = {
  title: string;
  description: string;
  internal: number;
};

type Block<T, K extends keyof T> = {
  props: Pick<T, K>;
};

export type Data = Block<FullProps, 'title' | 'description'>;
