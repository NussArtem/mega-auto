import {Component, NgModule, OnInit} from '@angular/core';
import {MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MissingTranslationService} from '@app/shared/services/missing-translation.service';
import {environment} from '@environments/environment.prod';
import {AccountService} from '@app/shared/services';
import {User} from '@app/shared/models';
import {Router} from "@angular/router";


@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  user: User;
  constructor(private translateService: TranslateService, private accountService: AccountService, private router: Router) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    this.translateService.use(environment.defaultLocale);
  }

}
