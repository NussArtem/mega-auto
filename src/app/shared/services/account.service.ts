import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {User} from '../models';

@Injectable({providedIn: 'root'})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username, password) {
    return this.http.post<any>(`http://94.237.97.139:8000/api/v1/token/`, {username, password})
      .pipe(map(data => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        let dataUser: User;
        dataUser = data.user;
        dataUser.access = data.access;
        dataUser.refresh = data.refresh;
        localStorage.setItem('user', JSON.stringify(dataUser));
        this.userSubject.next(data.user);
        return data.user;
      }));
  }


  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);

    this.router.navigate(['/account/login']);
  }

  register(user: User) {
    return this.http.post(`http://94.237.97.139:8000/api/v1/accounts/create/`, user);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  update(user: User) {
    return this.http.put(`http://94.237.97.139:8000/api/v1/accounts/update/`, user)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record

        // update local storage
        localStorage.setItem('user', JSON.stringify(user));
        // publish updated user to subscribers
        this.userSubject.next(user);
        return x;
      }));
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`)
      .pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        if (id === this.userValue.id) {
          this.logout();
        }
        return x;
      }));
  }
}
