import { Component, computed, effect, inject, Input, input } from '@angular/core';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  private usersService = inject(UsersService);
  userId = input.required<string>();
  // @Input({required: true}) set userId(uid: string) {
  //   console.log(uid);
  // }

  constructor() {
    effect(() => {
      console.log(this.userId());
    });
  }

  userName = computed(() => this.usersService.users.find(u => u.id === this.userId())?.name);
}
