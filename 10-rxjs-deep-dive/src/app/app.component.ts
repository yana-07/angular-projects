import { Component, DestroyRef, inject, OnInit } from '@angular/core';

import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    // at least one subscriber is needed to kick off the interval
    const subscription = interval(1000)
      .pipe(
        map((val: number) => val * 2)
      )
      .subscribe({
        next: (val) => console.log(val),
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
