// ONLY intersection type - no generic, no index access
type BaseProps = {
  title: string;
};

type ExtendedProps = {
  count: number;
};

export type Data = BaseProps & ExtendedProps;
