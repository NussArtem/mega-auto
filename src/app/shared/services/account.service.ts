import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models';
import {environment} from '@environments/environment.prod';

@Injectable({providedIn: 'root'})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private apiUrl: string;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
    this.apiUrl = environment.apiUrl;
  }


  public get userValue(): User {
    return this.userSubject.value;
  }


  login(username, password) {
    return this.http.post<any>(`${this.apiUrl}/token/`, {username, password})
      .pipe(map(data => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if (data) {
          let dataUser: User;
          dataUser = data.user;
          dataUser.access = data.access;
          dataUser.refresh = data.refresh;
          localStorage.setItem('user', JSON.stringify(dataUser));
          this.userSubject.next(dataUser);
          return data.user;
        }
      }));
  }


  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);

    this.router.navigate(['/account/login']);
      window.location.reload()
  }

  register(user: User) {

    return this.http.post(`${this.apiUrl}/accounts/create/`, user);
  }

  update(user: User) {
    return this.http.put(`${this.apiUrl}/accounts/update/`, user)
      .pipe(map(x => {
      }));
  }


  tokenRefresh() {
    return this.http.post<any>(`${this.apiUrl}/token/refresh/`, {refresh: this.userValue.refresh}).subscribe(
      value => {
        localStorage.removeItem('user');
        this.userValue.access = value.access;
        localStorage.setItem('user', JSON.stringify(this.userValue));
      },
      error => {
        this.logout();
      }
    );
  }

  tokenVerify() {
    return this.http.post<any>(`${this.apiUrl}/token/verify/`, {token: this.userValue.access});
  }
}
