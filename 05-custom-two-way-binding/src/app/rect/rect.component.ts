import { Component, EventEmitter, Input, Output, model } from '@angular/core';

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  //@Input({ required: true }) size!: { width: string; height: string };
  //@Output() sizeChange = new EventEmitter<{ width: string; height: string }>();
  size = model.required<{ width: string; height: string }>();

  ngOnInit() {
    //console.log(this.size);
  }

  onReset() {
    //this.sizeChange.emit({ width: '200', height: '100' });
    this.size.set({ width: '200', height: '100' });
  }
}
