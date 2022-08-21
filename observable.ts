import { Subscriber } from "./subscriber";
import { Subscription } from "./subscription";
import { Observer, TeardownLogic1 } from "./types";
import { isSubscriber } from "./util";

export class Observable<T> {
  constructor(_subscribe?: (this: Observable<T>, subscriber: Subscriber<T>) => void) {
    if (_subscribe) {
      this._subscribe = _subscribe;
    }
  }

  static create() {
    return new Observable();
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
