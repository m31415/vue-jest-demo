// Conditional type + index access for a single prop
type Container<T> = T extends string ? { data: T } : { value: T };

type MessageContainer = Container<string>;

export type Data = {
  title: string;
  content: MessageContainer["data"];  // Index access on conditional result
};
