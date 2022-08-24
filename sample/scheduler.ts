import { asapScheduler, asyncScheduler, from } from 'rxjs';


function syncSchedulerMain() {
    console.log('before');
    from([1, 2, 3]).subscribe((x: any) => {
        console.log(x);
    })
    console.log('after');
}

function asyncSchedulerMain() {
    console.log('asyncScheduler: before');
    from([1, 2, 3], asyncScheduler).subscribe((x: any) => {
        console.log(x);
    })
    Promise.resolve('asyncScheduler: promise').then(console.log);
    console.log('asyncScheduler: after');
}

function asapSchedulerMain() {
    console.log('asapScheduler: before');
    from([1, 2, 3], asapScheduler).subscribe((x: any) => {
        console.log(x);
    })
    Promise.resolve('asapScheduler: promise').then(console.log);
    console.log('asapScheduler: after');
}

// syncSchedulerMain();
// asyncSchedulerMain();
asapSchedulerMain();