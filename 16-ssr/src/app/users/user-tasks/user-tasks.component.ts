import { Component, inject, input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink]
})
export class UserTasksComponent {
  //userId = input.required<string>();
  message = input.required<string>();
  userName = input.required<string>();
  //userName = '';
  //private usersService = inject(UsersService);
  //userName = computed(() => this.usersService.users.find(u => u.id === this.userId())?.name);
  private  activatedRoute = inject(ActivatedRoute);
  //private destroyRef = inject(DestroyRef);
  // @Input({required: true}) set userId(uid: string) {
  //   console.log(uid);
  // }

  // constructor() {
  //   effect(() => {
  //     console.log(this.userId());
  //   });
  // }

  ngOnInit() {
    console.log(`Input Data: ${this.message()}`)
    // const subscription = this.activatedRoute.paramMap.subscribe({
    //   next: (paramMap) => {
    //     this.userName = this.usersService.users.find(u => u.id === paramMap.get('userId'))?.name || ''
    //   },
    // });

    // this.destroyRef.onDestroy(() => subscription.unsubscribe());

    const subscription = this.activatedRoute.data.subscribe({
      next: data => console.log(data)
    })
  }
}

export const resolveUserName: ResolveFn<string> = (
    activatedRoute: ActivatedRouteSnapshot, 
    routerState: RouterStateSnapshot
  ) => {
  const usersService = inject(UsersService);
  const userName = usersService.users.find(u => u.id === activatedRoute.paramMap.get('userId'))?.name || '';
  
  return userName;
}

export const resolveTitle: ResolveFn<string> = (
  activatedRoute, 
  routerState
) => {
  const userName = resolveUserName(activatedRoute, routerState);

  return `${userName}'s Tasks`;
}
