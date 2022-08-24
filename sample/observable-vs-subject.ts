import { Observable } from "../src/observable";
import { Subject } from "../src/subject";

function coldObservable() {
    console.log('========Observable==========')
    const ob = new Observable(observer => {
        observer.next(1);
        observer.next(2);
        observer.complete();
    });
    ob.subscribe((result) => {
        console.log(result);
    });
    setTimeout(() => {
        ob.subscribe((a) => { console.log(a) }) // 一秒后订阅仍然输出 1, 2
    }, 1000)
}



function hotSubject() {
    console.log('========Subject==========')
    const subject = new Subject();
    subject.subscribe(result => {
        console.log(result);
    });

    subject.next(1);

    setTimeout(() => {
        subject.next(2);
    }, 1000)

    setTimeout(() => {
        subject.subscribe((a) => { console.log(a) }) // 不会输出
    }, 1000)
}

function unicastObservable() {
    console.log('========Observable==========')
    const ob = new Observable(observer => {
        observer.next(Math.random())
    });
    ob.subscribe((result) => {
        console.log(result);
    });
    ob.subscribe((result) => {
        console.log(result);
    });
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

// coldObservable()
// hotSubject();
unicastObservable();
multicastSubject();

