// Generic + utility type - NO index access
type FullProps = {
  title: string;
  description: string;
  internal: number;
};

type PassThrough<T> = T;

export type Data = PassThrough<Pick<FullProps, 'title' | 'description'>>;
