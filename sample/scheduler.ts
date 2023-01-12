import { asapScheduler, asyncScheduler, from } from 'rxjs';


function syncSchedulerMain() {
    console.log('before');
    from([1, 2, 3]).subscribe(console.log)
    console.log('after');
}

function asyncSchedulerMain() {
    console.log('asyncScheduler: before');
    from([1, 2], asyncScheduler).subscribe(console.log)
    Promise.resolve('asyncScheduler: promise').then(console.log);
    console.log('asyncScheduler: after');
}

function asapSchedulerMain() {
    console.log('asapScheduler: before');
    from([1, 2], asapScheduler).subscribe(console.log)
    Promise.resolve('asapScheduler: promise').then(console.log);
    console.log('asapScheduler: after');
}

// syncSchedulerMain();
asyncSchedulerMain();
// asapSchedulerMain();