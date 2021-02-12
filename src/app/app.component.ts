﻿import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {environment} from '@environments/environment.prod';
import {AccountService} from '@app/shared/services/helpers';
import {User} from '@app/shared/models';
import {Router} from '@angular/router';


@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isCollapsed: boolean;
  user: User;

  constructor(private translateService: TranslateService, private accountService: AccountService, private router: Router) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    this.translateService.use(environment.defaultLocale);
  }

}
