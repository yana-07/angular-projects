import { AfterViewInit, Component, OnInit, DestroyRef, inject, signal, effect } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit, AfterViewInit {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');
  //private interval: ReturnType<typeof setInterval> | undefined;
  private destroyRef = inject(DestroyRef);

  constructor() {
    // effect() will set up a subscription and allow us to run a piece of code whenever the signal value changes
    // onCleanup is a function (hook) which can be executed as part of the effect function to define what should
    // happen before the effect code runs the next time (e.g. clear a timer set by the setTimeout())
    effect((onCleanUp) => console.log(this.currentStatus()));
  }

  ngOnInit() {
    console.log('SERVER STATUS COMPONENT ON INIT');

    const interval = setInterval(() => {
      const rnd = Math.random();

      if (rnd < 0.5) {
        this.currentStatus.set('online');
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);

    // set up a listener to execute an event handler when the component is about to be destroyed
    // available from Angular v16 and above
    this.destroyRef.onDestroy(() => clearInterval(interval));
  }

  ngAfterViewInit() {
    console.log('AFTER VIEW INIT');
  }

  // ngOnDestroy() {
  //   clearTimeout(this.interval);
  // }
}
