// Index access + conditional type - NO generic
type MessageOrValue<T> = T extends string ? { message: T } : { value: T };

type ResolvedProps = MessageOrValue<string>;

type Container = {
  props: ResolvedProps;
};

export type Data = Container;
