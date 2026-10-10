import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Patients } from './pages/patients/patients';
import { Appointments } from './pages/appointments/appointments';


export const routes: Routes = [
    {
    path: 'login',
    component: Login
  },

  {
    path: 'dashboard',
    component: Dashboard
  },

  {
    path: 'patients',
    component: Patients
  },

  {
    path: 'appointments',
    component: Appointments
  }

];

