import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UsersRoutingModule} from './users-routing.module';
import {LayoutComponent} from './layout/layout.component';
import {ProfileComponent} from './profile/profile.component';
import {AddEditComponent} from './add-edit/add-edit.component';
import {ScoreComponent} from './score/score.component';
import {AdsComponent} from './ads/ads.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    FormsModule,
    TranslateModule
  ],
  declarations: [
    LayoutComponent,
    ProfileComponent,
    AddEditComponent,
    ScoreComponent,
    AdsComponent
  ]
})
export class UsersModule {
}
