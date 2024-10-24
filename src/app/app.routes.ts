import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/stepper/forms/step1-form/step1-form.component').then(
        (m) => m.Step1FormComponent
      ),
  },
];
