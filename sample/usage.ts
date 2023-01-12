// RxJS v6+
import { fromEvent, interval, Observable, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


const clicks = fromEvent(document, 'click');

// 用 ‘clicks’ Observable来通知 ‘interval’ Observable 停止发出值
// 当我们点击页面时，定时器就会停止
const results = interval(1000).pipe(takeUntil(clicks));

results.subscribe(console.log)

new Observable();