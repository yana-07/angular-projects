import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
  computed,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 });
  customInterval$ = new Observable((subscriber) => {
    // here we control when the next event will be emitted
    let timesExecuted = 0;
    const interval = setInterval(() => {
      //subscriber.error();
      if (timesExecuted > 3) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }

      console.log('Emitting new value...');
      subscriber.next({ message: 'New value' });
      timesExecuted++;
    }, 2000);
  });
  //interval = signal(0);
  //doubleInterval = computed(() => this.interval() * 2);

  constructor() {
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times.`)
    //   console.log(this.doubleInterval());
    // });
  }

  ngOnInit() {
    const subscription = this.clickCount$.subscribe((val) =>
      // here we define what happens when the next event is emitted
      console.log(`Clicked button ${this.clickCount()} times.`)
    );
    // setInterval(() => {
    //   this.interval.update(prevIntervalNum => prevIntervalNum + 1);
    // }, 1000);
    // at least one subscriber is needed to kick off the interval
    // const subscription = interval(1000)
    //   .pipe(
    //     map((val: number) => val * 2)
    //   )
    //   .subscribe({
    //     next: (val) => console.log(val),
    //   });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());

    const customIntervalSubscription = this.customInterval$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('completed'),
      error: () => {} 
    });
    this.destroyRef.onDestroy(() => customIntervalSubscription.unsubscribe());
  }

  onClick() {
    this.clickCount.update((prevCount) => prevCount + 1);
  }
}
