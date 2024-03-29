import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnonymousGuardService } from './core/anonymous-guard/anonymous-guard.service';
import { AuthGuardService } from './core/auth-guard/auth-guard.service';

const routes: Routes = [{
  path: 'sign-in',
  loadChildren: () => import('./components/sign-in/sign-in.module').then(m => m.SignInModule),
  canLoad: [AnonymousGuardService],
}, {
  path: 'main',
  loadChildren: () => import('./components/main/main.module').then(m => m.MainModule),
  canLoad: [AuthGuardService],
}, {
  path: '**',
  redirectTo: 'main',
  pathMatch: 'full',
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
