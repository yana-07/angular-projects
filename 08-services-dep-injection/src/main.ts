import { bootstrapApplication } from '@angular/platform-browser';
import { InjectionToken } from '@angular/core';

import { AppComponent } from './app/app.component';
import { TasksService } from './app/tasks/tasks.service';

// the token that should be used when requesting the injectable
export const TasksServiceToken = new InjectionToken<TasksService>('tasks-service-token');

// bootstrapApplication(AppComponent).catch((err) => console.error(err));
// bootstrapApplication(AppComponent, {
//     providers: [TasksService]
// }).catch((err) => console.error(err));
bootstrapApplication(AppComponent, {
    providers: [{ provide: TasksServiceToken, useClass: TasksService }]
}).catch((err) => console.error(err));
