import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './entities/home';
import { AuthGuard } from './shared/helpers';
import {ContentComponent} from '@app/entities/home/content/content.component';

const accountModule = () => import('./core/account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./entities/user/users.module').then(x => x.UsersModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'profile', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule  },
    // otherwise redirect to homez
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
