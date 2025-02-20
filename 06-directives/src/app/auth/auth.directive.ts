import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true,
})
export class AuthDirective {
  userType = input.required<Permission>({ alias: 'appAuth' });
  private authService = inject(AuthService);
  // telling Angular that the directive will be used on an ng-template element - provides access to the content of the template
  private templateRef = inject(TemplateRef);
  // provides access to the place in the DOM where the directive is being used (the ng-template element)
  private viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect((onCleanUp) => {
      if (this.authService.activePermission() === this.userType()) {
        // tells Angular to take the content between the ng-template tags
        // and render it in the place where the directive is used, so in the end instead of the ng-template element
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}
