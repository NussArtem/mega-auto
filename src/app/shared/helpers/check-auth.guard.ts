import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AccountService} from "../services";
import {AuthGuard} from "./auth.guard";

@Injectable({
  providedIn: 'root'
})
export class CheckAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private accountService: AccountService,
    private auth: AuthGuard
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.accountService.userValue;
    console.log(user.username);
    this.router.navigate(['/account/password-check/' + user.username], { queryParams: { returnUrl: state.url }});
    // authorised so return true
    return false;
  }
}
