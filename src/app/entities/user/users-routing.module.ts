import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LayoutComponent} from './layout/layout.component';
import {ProfileComponent} from './profile/profile.component';
import {AddEditComponent} from './add-edit/add-edit.component';
import {ScoreComponent} from './score/score.component';
import {AdsComponent} from './ads/ads.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {path: '', component: ProfileComponent},
      {path: 'add', component: AddEditComponent},
      {path: 'edit', component: AddEditComponent},
      {path: 'score', component: ScoreComponent},
      {path: 'ads', component: AdsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
