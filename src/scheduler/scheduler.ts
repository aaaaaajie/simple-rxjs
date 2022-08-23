import { Subscription } from "../subscription";
import { SchedulerAction } from "../types";
import { Action } from "./action";

export abstract class Scheduler {

    public now: () => number;

    constructor(private actionCtor: typeof Action, now: () => number = Scheduler.now) {
        this.now = now;
    }

    static now() {
        return Date.now();
    }

    public schedule<T>(work: (this: SchedulerAction<T>, state?: T) => void, delay: number = 0, state?: T): Subscription {
        return new this.actionCtor<T>(this, work).schedule(state, delay);
    }
}