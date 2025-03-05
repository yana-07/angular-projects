import { Component } from '@angular/core';

import { LoginReactiveComponent } from './auth/login/login-reactive.component';
import { SignupComponent } from './auth/signup/signup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [LoginReactiveComponent, SignupComponent],
})
export class AppComponent {}
