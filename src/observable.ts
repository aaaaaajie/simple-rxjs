import { Subscriber } from "./subscriber";
import { Subscription } from "./subscription";
import { isSubscriber } from "./util";

export class Observable<T> {
  constructor(_subscribe?: (subscriber: Subscriber<T>) => void) {
    if (_subscribe) {
      this._subscribe = _subscribe;
    }
  }

  static create(subscribe?: (subscriber: Subscriber<any>) => void) {
    return new Observable(subscribe);
  }

  pipe() {}

  /** @internal */
  protected _subscribe(subscriber: Subscriber<T>): void {

  }

  subscribe(
    next?: ((value: T) => void),
    error?: ((error: any) => void) | null,
    complete?: (() => void) | null): Subscription {
    const subscriber = isSubscriber(next) ? next : new Subscriber(next, error, complete);
    subscriber.add(this._subscribe(subscriber));
    return subscriber;
  }
}
