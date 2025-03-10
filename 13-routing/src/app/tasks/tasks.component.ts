import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  userId = input.required<string>();
  //order = input<'asc' | 'desc'>();
  //order?: 'asc' | 'desc';
  order = signal<'asc' | 'desc'>('desc');
  userTasks = computed(() => {
    return this.tasksService.allTasks()
      .filter((t) => t.userId === this.userId())
      .sort((a, b) => {
        if (this.order() === 'asc') {
          return a.id < b.id ? -1 : 1; 
        } else {
          return a.id < b.id ? 1 : -1;
        }
      });
  });
  private tasksService = inject(TasksService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    const subscription = this.activatedRoute.queryParams.subscribe({
      next: (queryParams) => {
        this.order.set(queryParams['order']);
      }
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
