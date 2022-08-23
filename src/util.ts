import { Subscriber } from "./subscriber";
import { Subscription } from "./subscription";
import { Observer } from "./types";

export function isFunction(value: any): value is (...args: any[]) => any {
    return typeof value === 'function';
}

export function isSubscriber<T>(value: any): value is Subscriber<T> {
    return (value && value instanceof Subscriber) || (isObserver(value) && isSubscription(value));
}

export function isObserver<T>(value: any): value is Observer<T> {
    return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}

export function isSubscription(value: any): value is Subscription {
    return (
        value instanceof Subscription ||
        (value && 'closed' in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe))
    );
}

export function pipeFromArray(fns: Array<Function>): Function {
    if (fns.length === 0) {
        return (x: any) => x;
    }

    if (fns.length === 1) {
        return fns[0];
    }

    return (input: any) => {
        return fns.reduce((prev: any, fn: Function) => fn(prev), input);
    };
}