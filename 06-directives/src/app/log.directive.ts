import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'onLog()',
  },
})
export class LogDirective {
  private elementRef = inject(ElementRef);

  onLog() {
    console.log('CLICKED');
    console.log(this.elementRef);
  }
}
