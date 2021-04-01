import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';


const routes: Routes = [{
  path: '',
  component: MainComponent,
  children: [
    {
      path: 'accounts',
      loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule),
    }, {
      path: 'files',
      loadChildren: () => import('./files/files.module').then(m => m.FilesModule),
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {
}
