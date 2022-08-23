import { Subscription } from "../subscription";
import { SchedulerAction } from "../types";
import { Scheduler } from "./scheduler";

export class Action<T> extends Subscription {
    constructor(scheduler: Scheduler, work: (this: SchedulerAction<T>, state?: T) => void) {
        super();
    }

    public schedule(state?: T, delay: number = 0): Subscription {
        return this;
    }

    execute(state?: T, delay: number = 0): boolean {
        return true;
    };
}