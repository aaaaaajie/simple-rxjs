import { SubscriptionLike, TeardownLogic } from "./types";
import { isFunction } from "./util";

export class Subscription implements SubscriptionLike {

    closed = false;

    _finalizers: TeardownLogic[] = [];

    unsubscribe(): void {
        if (!this.closed) {
            this.closed = true;
            for (let i = 0; i < this._finalizers.length; i++) {
                const item = this._finalizers[i];
                if (isFunction(item)) {
                    item();
                }
                if (item instanceof Subscription) {
                    this._finalizers.splice(i, 1);
                }
            }
        }
    }

    add(teardown: TeardownLogic) {
        if (teardown) {
            this._finalizers.push(teardown);
        }
    }
}