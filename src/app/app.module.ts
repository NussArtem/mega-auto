﻿import {MissingTranslationHandler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MissingTranslationService} from '@app/shared/services/missing-translation.service';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
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
import {ErrorInterceptor, fakeBackendProvider, JwtInterceptor} from '@app/shared/helpers';
import {MatChipsModule} from "@angular/material/chips";

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
    MatChipsModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    ContentComponent,
    CardAutoComponent

,
    NavComponent ,
    SidebarComponent ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

    // provider used to create fake backend
    fakeBackendProvider
  ],
  exports: [
    ContentComponent,
    SidebarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
