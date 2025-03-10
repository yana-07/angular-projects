import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userId = input.required<string>();
  order = input<'asc' | 'desc'>();
  userTasks = computed(() => {
    return this.tasksService.allTasks().filter((t) => t.userId === this.userId())
  });
  private tasksService = inject(TasksService);
}
