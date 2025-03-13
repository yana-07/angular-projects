import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterStateSnapshot } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userId = input.required<string>();
  userTasks = input.required<Task[]>();
  order = input<'asc' | 'desc' | undefined>();
  //order?: 'asc' | 'desc';
  // order = signal<'asc' | 'desc'>('desc');
  // userTasks = computed(() => {
  //   return this.tasksService.allTasks()
  //     .filter((t) => t.userId === this.userId())
  //     .sort((a, b) => {
  //       if (this.order() === 'asc') {
  //         return a.id < b.id ? -1 : 1; 
  //       } else {
  //         return a.id < b.id ? 1 : -1;
  //       }
  //     });
  // });
  //private tasksService = inject(TasksService);
  //private activatedRoute = inject(ActivatedRoute);
  //private destroyRef = inject(DestroyRef);

  // ngOnInit() {
  //   const subscription = this.activatedRoute.queryParams.subscribe({
  //     next: (queryParams) => {
  //       this.order.set(queryParams['order']);
  //     }
  //   });

  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  // }
}

export const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRoute: ActivatedRouteSnapshot, 
  routerState: RouterStateSnapshot
) => {
  const tasksService = inject(TasksService);
  const userId = activatedRoute.paramMap.get('userId');
  const order = activatedRoute.queryParams['order'];
  const tasks = tasksService.allTasks().filter(t => t.userId === userId)

  if (order === 'asc') {
    tasks.sort((a, b) => a < b ? -1 : 1);
  } else {
    tasks.sort((a, b) => a < b ? 1 : -1);
  }

  return tasks.length ? tasks : [];
}
