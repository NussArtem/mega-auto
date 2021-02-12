import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AccountService} from "../services/helpers";
import {AuthGuard} from "./auth.guard";

@Injectable({
  providedIn: 'root'
})
export class CheckAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private accountService: AccountService,
    private auth: AuthGuard
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.accountService.userValue;
    this.router.navigate(['/account/password-check/' + user.username], {queryParams: {returnUrl: state.url}});
    // authorised so return true
    return false;
  }
}
