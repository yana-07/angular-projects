import { Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {
  // @ViewChild(ButtonComponent) form: ElementRef<ButtonComponent> | undefined; -> directive classes passed as arguments possible
  // @ViewChildren(ButtonComponent) buttons: ElementRef<ButtonComponent>[] | undefined; 
  // When the component class is instantiated, no component View will exist yet, therefore the initial value will
  // be undefined and will be populated once Angular has initialized the component View
  // @ViewChild('form') private form: ElementRef<HTMLFormElement> | undefined; // not a css selector but the name of the template variable without the '#'

  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  onSubmit(title: string, ticketText: string) {
    //this.form?.nativeElement.reset();
    this.form().nativeElement.reset();
  }
}
