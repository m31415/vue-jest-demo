// ONLY conditional type - no generic, no index access
type MessageOrValue<T> = T extends string ? { message: T } : { value: T };

export type Data = MessageOrValue<string>;
