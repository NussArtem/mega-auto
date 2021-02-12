import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './entities/home';
import {AuthGuard} from './shared/helpers';
import {AutoComponent} from '@app/entities/home/auto/auto.component';
import {ContentComponent} from '@app/entities/home/content/content.component';

const homeModule = () => import('./core/account/account.module').then(x => x.AccountModule);
const accountModule = () => import('./core/account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./entities/user/users.module').then(x => x.UsersModule);

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: '', component: ContentComponent},
      {path: 'auto/:id', component: AutoComponent}
    ]
  },
  {path: 'profile', loadChildren: usersModule, canActivate: [AuthGuard]},
  {path: 'account', loadChildren: accountModule},
  // otherwise redirect to homez
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
