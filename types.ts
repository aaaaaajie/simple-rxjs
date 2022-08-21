import { Subscription } from "./subscription";

export interface Observer<T> {
    next: (value: T) => void;
    error: (err: any) => void;
    complete: () => void;
}
export interface SubscriptionLike {
    unsubscribe(): void;
    readonly closed: boolean;
}

export type TeardownLogic1 = Subscription | (() => void) | void;