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

export type TeardownLogic = Subscription | (() => void) | void;

export interface SchedulerLike {
    schedule<T>(work: (state: T) => void, delay: number, state: T): Subscription;
    schedule<T>(work: (state?: T) => void, delay: number, state?: T): Subscription;
    schedule<T>(work: (state?: T) => void, delay?: number, state?: T): Subscription;
}

export interface SchedulerAction<T> extends Subscription {
    schedule(state?: T, delay?: number): Subscription;
  }