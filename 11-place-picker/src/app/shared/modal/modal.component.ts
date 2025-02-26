import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  imports: [],
})
export class ModalComponent implements AfterViewInit {
  private dialogRef = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  ngAfterViewInit() {
    this.dialogRef().nativeElement.showModal();
  }
}
