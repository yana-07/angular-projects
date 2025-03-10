import { Component, computed, DestroyRef, effect, inject, input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  //userId = input.required<string>();
  userName = '';
  private usersService = inject(UsersService);
  private  activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  // @Input({required: true}) set userId(uid: string) {
  //   console.log(uid);
  // }

  // constructor() {
  //   effect(() => {
  //     console.log(this.userId());
  //   });
  // }

  //userName = computed(() => this.usersService.users.find(u => u.id === this.userId())?.name);

  ngOnInit() {
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.userName = this.usersService.users.find(u => u.id === paramMap.get('userId'))?.name || ''
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
