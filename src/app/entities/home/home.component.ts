import {Component} from '@angular/core';

import {User} from '@app/shared/models';
import {AccountService} from '@app/shared/services/helpers';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  user: User;

  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
  }
}
