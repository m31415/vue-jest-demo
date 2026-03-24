// ONLY utility type - no generic, no index access
type FullProps = {
  title: string;
  description: string;
  internal: number;
};

export type Data = Pick<FullProps, 'title' | 'description'>;
