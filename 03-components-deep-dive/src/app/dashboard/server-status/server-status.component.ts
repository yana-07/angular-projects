import { AfterViewInit, Component, OnInit, DestroyRef, inject } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit, AfterViewInit {
  currentStatus: 'online' | 'offline' | 'unknown' = 'online';
  //private interval: ReturnType<typeof setInterval> | undefined;
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    console.log('ON INIT');

    const interval = setInterval(() => {
      const rnd = Math.random();

      if (rnd < 0.5) {
        this.currentStatus = 'online';
      } else if (rnd < 0.9) {
        this.currentStatus = 'offline';
      } else {
        this.currentStatus = 'unknown';
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
