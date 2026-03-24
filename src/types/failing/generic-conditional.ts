// Generic + conditional type - NO index access
type MessageOrValue<T> = T extends string ? { message: T } : { value: T };

type ResolvedProps = MessageOrValue<string>;

type PassThrough<T> = T;

export type Data = PassThrough<ResolvedProps>;
