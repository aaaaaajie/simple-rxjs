import { SubscriptionLike, TeardownLogic1 } from "./types";
import { isFunction } from "./util";

export class Subscription implements SubscriptionLike {

    closed = false;

    _finalizers: TeardownLogic1[] = [];

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

    add(tl: TeardownLogic1) {
        if (tl) {
            this._finalizers.push(tl);
        }
    }
}