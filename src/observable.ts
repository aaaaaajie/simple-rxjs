import { Operator } from "./operator/operator";
import { Subscriber } from "./subscriber";
import { Subscription } from "./subscription";
import { TeardownLogic } from "./types";
import { isSubscriber, pipeFromArray } from "./util";

export class Observable<T> {

  source: Observable<any> | undefined;

  operator?: Operator<any, T>;

  constructor(_subscribe?: (subscriber: Subscriber<T>) => TeardownLogic) {
    if (_subscribe) {
      this._subscribe = _subscribe;
    }
  }

  static create(subscribe?: (subscriber: Subscriber<any>) => TeardownLogic) {
    return new Observable(subscribe);
  }

  pipe(...operations: Function[]): Observable<any> {
    return pipeFromArray(operations)(this);
  }

  public lift<R>(operator?: Operator<any, any>): Observable<R> {
    const observable = new Observable<R>();
    observable.source = this;
    observable.operator = operator;
    return observable;
  }

  protected _subscribe(subscriber: Subscriber<T>): TeardownLogic {}

  subscribe(
    next?: ((value: T) => void) | Subscriber<T>,
    error?: ((error: any) => void) | null,
    complete?: (() => void) | null): Subscription {
    const subscriber = isSubscriber(next) ? next : new Subscriber(next as (value: T) => void, error, complete);
    const { operator, source } = this;
    subscriber.add(operator ? operator.call(subscriber, source) : this._subscribe(subscriber));
    return subscriber;
  }
}
