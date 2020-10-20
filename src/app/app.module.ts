import {MissingTranslationHandler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MissingTranslationService} from '@app/shared/services/helpers/missing-translation.service';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from '@app/app-routing.module';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {AppComponent} from '@app/app.component';

import {ContentComponent} from '@app/entities/home/content/content.component';
import {CardAutoComponent} from '@app/entities/home/card-auto/card-auto.component';
import {SidebarComponent} from '@app/layout/navigation/sidebar/sidebar.component';
import {NavComponent} from '@app/layout/navigation/nav/nav.component';
import {AlertComponent} from '@app/shared/alert';
import {HomeComponent} from '@app/entities/home';
import {ErrorInterceptor, JwtInterceptor} from '@app/shared/helpers';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ChipsMultInputComponent} from './shared/input/chips-mult-input/chips-mult-input.component';
import {MatPaginatorModule} from '@angular/material/paginator';;
import {MultipleSelectInfiniteScrollingInputComponent} from './shared/input/multiple-select-infinite-scrolling-input/multiple-select-infinite-scrolling-input.component'
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MultipleSelectGroupInputComponent } from './shared/input/multiple-select-group-input/multiple-select-group-input.component';
import { YearFromToInputComponent } from './shared/input/year-from-to-input/year-from-to-input.component';
import { FromToInputComponent } from './shared/input/from-to-input/from-to-input.component';

import { MultiselectInputComponent } from './shared/input/multiselect-input/multiselect-input.component';
import { MultiselectGroupInputComponent } from './shared/input/multiselect-group-input/multiselect-group-input.component';;
import { AutoComponent } from './entities/home/auto/auto.component';
import { ModelMultiSelectGroupComponent } from './entities/home/model-multi-select-group/model-multi-select-group.component'
export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}


@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MissingTranslationService},
      useDefaultLang: false,
    }),
    BrowserModule,
    ScrollingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    MatInputModule,
    FormsModule,
    MatRadioModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TranslateModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatPaginatorModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    ContentComponent,
    CardAutoComponent,
    NavComponent,
    SidebarComponent,
    ChipsMultInputComponent,
    MultipleSelectInfiniteScrollingInputComponent,
    MultipleSelectGroupInputComponent,
    YearFromToInputComponent,
    FromToInputComponent,
    MultiselectInputComponent,
    MultiselectGroupInputComponent
,
    AutoComponent
,
    ModelMultiSelectGroupComponent ],


  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

    // provider used to create fake backend

  ],
  exports: [
    ContentComponent,
    SidebarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
