import {Component, OnInit} from '@angular/core';

import {AccountService} from '../../../shared/services/helpers';
import {User} from '../../../shared/models';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  users = null;
  user: User;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
    this.user = this.accountService.userValue;
  }


  ngOnInit() {
  }

}
