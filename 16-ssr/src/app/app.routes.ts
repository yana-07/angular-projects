import { inject } from '@angular/core';
import { CanMatchFn, RedirectCommand, Route, Router, Routes, UrlSegment } from '@angular/router';

import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { resolveTitle, resolveUserName, UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes as userRoutes } from './users/users.routes';

const dummyCanMatch: CanMatchFn = (
  route: Route, 
  segments: UrlSegment[]
) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random() < 0.5;
  if (shouldGetAccess) {
    return true;
  }

  return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    //redirectTo: '/users/u1',
    //pathMatch: 'full' -> must be set to 'full' since all paths are prefixed by ''
    title: 'No task selected'
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userRoutes,
    //canMatch: [dummyCanMatch],
    data: {
      message: 'Hello!'
    },
    resolve: {
      userName: resolveUserName
    },
    title: resolveTitle
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
