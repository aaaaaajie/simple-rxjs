import { Action } from "./action";
import { Scheduler } from "./scheduler";

export class AsyncScheduler extends Scheduler {
    public actions: Array<any> = [];
    
    public _active: boolean = false;
    
    public _scheduled: any = undefined;

    constructor(SchedulerAction: typeof Action) {
        super(SchedulerAction);
    }

    public flush(action: any): void {
        const { actions } = this;

        if (this._active) {
            actions.push(action);
            return;
        }

        let error: any;
        this._active = true;

        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while ((action = actions.shift()!)); // exhaust the scheduler queue

        this._active = false;

        if (error) {
            while ((action = actions.shift()!)) {
                action.unsubscribe();
            }
            throw error;
        }
    }
}