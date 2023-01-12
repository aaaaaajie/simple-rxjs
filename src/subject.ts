import { Observable } from "./observable";
import { Subscriber } from "./subscriber";
import { Observer, SubscriptionLike, TeardownLogic } from "./types";

export class Subject<T> extends Observable<T> implements SubscriptionLike {

    closed = false;

    observers: Observer<T>[] = [];

    constructor() {
        super();
    }

    next(value: T) {
        for (const observer of this.observers) {
            observer.next(value);
        }
    }

    protected _subscribe(subscriber: Subscriber<T>): TeardownLogic {
        this.observers.push(subscriber);
    }

    unsubscribe(): void {
    }
    

}