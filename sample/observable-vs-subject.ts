import { Observable } from "../src/observable";
import { Subject } from "../src/subject";

function coldObservable() {
    console.log('========Observable==========')
    const ob = new Observable(observer => {
        observer.next(1);
        observer.complete();
    });
    ob.subscribe(console.log);
    setTimeout(() => {
        ob.subscribe(console.log) // 一秒后订阅仍然输出 1, 2
    }, 1000)
}



function hotSubject() {
    console.log('========Subject==========')
    const subject = new Subject();
    subject.next(1);

    setTimeout(() => {
        subject.subscribe(console.log) // 不会输出
    }, 1000)
}

function unicastObservable() {
    console.log('========Observable==========')
    const ob = new Observable(observer => {
        observer.next(Math.random())
    });
    ob.subscribe(console.log);
    ob.subscribe(console.log);
}

function multicastSubject() {
    console.log('========Subject==========')
    const subject = new Subject();
    subject.subscribe((result) => {
        console.log(result);
    });
    subject.subscribe((result) => {
        console.log(result);
    });
    subject.next(Math.random());
}

coldObservable()
// hotSubject();
// unicastObservable();
// multicastSubject();

