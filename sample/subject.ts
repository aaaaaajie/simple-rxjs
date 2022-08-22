import { Subject } from "../src/subject";

const subject = new Subject();
subject.subscribe(result => {
    console.log(result);
});

subject.subscribe(result => {
    console.log(result);
});

subject.next(1);