import { Subscription } from "./subscription";
import { Observer } from "./types";

export class Subscriber<T> extends Subscription implements Observer<T> {

    constructor(
        private _next?: ((value: T) => void),
        private _error?: ((error: any) => void) | null,
        private _complete?: (() => void) | null) {
        super();
    }

    next(value: T) {
        this._next && this._next(value);
    };

    error(err: any) {
        this._error && this._error(err);
    }

    complete() {
        this._complete && this._complete();
    }
}