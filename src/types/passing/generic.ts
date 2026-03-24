// Generic WITHOUT index access - for comparison
type PassThrough<T> = T;

type DataProps = {
  title: string;
};

export type Data = PassThrough<DataProps>;
