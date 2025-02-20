import { Directive, input, inject, ElementRef } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
  queryParam = input<string>('myapp', { alias: 'appSafeLink' });
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log('SafeLinkDirective is active.');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm(
      'Are you sure you want to leave the app?'
    );

    if (wantsToLeave) {
      // const address = (event.target as HTMLAnchorElement).href;
      // (event.target as HTMLAnchorElement).href = `${address}?from=${this.queryParam()}`;
      const address = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href = `${address}?from=${this.queryParam()}`;
      return;
    }

    event.preventDefault();
  }
}
