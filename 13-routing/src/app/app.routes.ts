import { Routes } from '@angular/router';

import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes as userRoutes } from './users/users.routes';

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    //redirectTo: '/users/u1',
    //pathMatch: 'full' -> must be set to 'full' since all paths are prefixed by ''
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userRoutes
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
