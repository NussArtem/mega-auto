import {Component, OnInit} from '@angular/core';
import {User} from '../../../shared/models';
import {AccountService} from '../../../shared/services';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  user: User;


  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
    this.user = this.accountService.userValue;
  }

  logout() {
    this.accountService.logout();
  }


}
