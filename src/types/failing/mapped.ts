// ONLY mapped type - no generic, no index access
type OriginalProps = {
  title: string;
  count: number;
};

export type Data = {
  [K in keyof OriginalProps]: OriginalProps[K];
};
