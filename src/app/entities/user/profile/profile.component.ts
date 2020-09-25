import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {AccountService} from '../../../shared/services';
import {User} from "../../../shared/models";
import {ActivatedRoute} from "@angular/router";
import {AuthGuard} from "../../../shared/helpers";

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


  ngOnInit() {}

  deleteUser(id: string) {
    const user = this.users.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => this.users = this.users.filter(x => x.id !== id));
  }
}
