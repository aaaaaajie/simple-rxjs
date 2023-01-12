import { Observable } from "../src/observable"
import { Operator } from "../src/operator/operator"
import { Subscriber } from "../src/subscriber"

const isEven = () => {
    return (source: Observable<any>) => {
        return new Observable<any>(observer => {
            const subscription = source.subscribe((x) => {
                observer.next(x % 2 === 0);
                observer.complete();
            })
            return () => subscription.unsubscribe();
        })
    }
}

const odd = () => {
    const operator: Operator<any, any> = {
        call(subscriber: Subscriber<any>, source: any) {
            const subscription = source.subscribe((x: any) => subscriber.next(x % 2 !== 0));
            return () => {
                subscription.unsubscribe();
            };
        },
    }
    return operator;
}

new Observable(observer => {
    observer.next(7);
})
    .pipe(isEven())
    .subscribe(x => {
        console.log(x);
    });

new Observable(observer => {
    observer.next(7);
})
    .lift(odd())
    .subscribe(console.log)