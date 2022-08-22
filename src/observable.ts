import { Subscriber } from "./subscriber";
import { Subscription } from "./subscription";
import { TeardownLogic } from "./types";
import { isSubscriber } from "./util";

export class Observable<T> {

  source: Observable<any> | undefined;

  constructor(_subscribe?: (subscriber: Subscriber<T>) => TeardownLogic) {
    if (_subscribe) {
      this._subscribe = _subscribe;
    }
  }

  static create(subscribe?: (subscriber: Subscriber<any>) => TeardownLogic) {
    return new Observable(subscribe);
  }

  pipe() {}

  /** @internal */
  protected _subscribe(subscriber: Subscriber<T>): TeardownLogic {}

  subscribe(
    next?: ((value: T) => void) | Subscriber<T>,
    error?: ((error: any) => void) | null,
    complete?: (() => void) | null): Subscription {
    const subscriber = isSubscriber(next) ? next : new Subscriber(next as (value: T) => void, error, complete);
    subscriber.add(this._subscribe(subscriber));
    return subscriber;
  }
}
