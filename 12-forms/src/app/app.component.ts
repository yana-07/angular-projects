import { Component } from '@angular/core';

import { LoginReactiveComponent } from './auth/login/login-reactive.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [LoginReactiveComponent],
})
export class AppComponent {}
