import { Component, ElementRef, inject, input, ViewEncapsulation, ContentChild, contentChild } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()'
  }
})
export class ControlComponent {
  // @HostBinding('class') className = 'control';
  // @HostListener('click') onClick() {
  //   console.log('clicked!')
  // }
  label = input.required<string>();
  private el = inject(ElementRef); // provides access to the host element rendered to the DOM
  // ContentChild and not ContentChildren, as there will be only one input or textarea element injected per ControlComponent
  // @ContentChild('input') private control: ElementRef<HTMLInputElement | HTMLTextAreaElement> | undefined;
  private control = contentChild.required<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  onClick() {
    console.log(this.el);
    console.log(this.control().nativeElement.value);
  }
}
