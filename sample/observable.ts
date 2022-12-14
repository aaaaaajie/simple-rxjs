import { Observable } from "../src/observable";
import { Subscription } from "../src/subscription";

const ob = new Observable(observer => {
    observer.next(1);
    observer.next(2);
    observer.complete();
});
const subscription = ob.subscribe((result) => {
    console.log(result);
});
console.log(subscription instanceof Subscription);