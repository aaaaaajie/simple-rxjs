import { Observable } from "../src/observable"
import { Operator } from "../src/operator/operator"
import { Subscriber } from "../src/subscriber"

const isEven = () => {
    return (source: Observable<any>) => {
        return new Observable<any>(observer => {
            return source.subscribe((x) => {
                observer.next(x % 2 === 0);
                observer.complete();
            })
        })
    }
}

const odd = () => {
    const operator: Operator<any, any> = {
        call(subscriber: Subscriber<any>, source: any) {
            return () => {
                source.subscribe((x: any) => subscriber.next(x))
                // subscriber.next(source % 2 === 0);
                // subscriber.complete();
            };
        }
    }
    return operator;
}

// new Observable(observer => {
//     observer.next(7);
// })
//     .pipe(isEven())
//     .subscribe(x => {
//         console.log(x);
//     });

new Observable(observer => {
    observer.next(7);
}).lift(odd).subscribe(x => {
    console.log(x);
})