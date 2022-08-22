import { SubscriptionLike, TeardownLogic } from "./types";
import { isFunction } from "./util";

export class Subscription implements SubscriptionLike {

    closed = false;

    _finalizers: TeardownLogic[] = [];

    unsubscribe(): void {
        for (const ob of this._finalizers) {
            if (isFunction(ob)) {
                ob();
            }
            if (ob instanceof Subscription) {
                ob.unsubscribe();
            }
        }
    }

    add(teardown: TeardownLogic) {
        if (teardown) {
            this._finalizers.push(teardown);
        }
    }
}