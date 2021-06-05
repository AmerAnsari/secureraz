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
      path: 'media',
      loadChildren: () => import('./media/media.module').then(m => m.MediaModule),
    }, {
      path: 'category',
      loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {
}
