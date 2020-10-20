import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService, AlertService} from '../../../shared/services/helpers';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {User} from '../../../shared/models';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['../../../core/account/login/login.component.scss', './ads.component.scss']
})
export class AdsComponent implements OnInit, OnDestroy {

  isTrue = false;

  form: FormGroup;
  loading = false;
  submitted = false;
  username: string = '';
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    this.accountService.user.subscribe(x => this.user = x);
    this.username = this.user.username;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.login(this.username, this.f.password.value).subscribe({
      next: () => {
        this.isTrue = true;
      },
      error: error => {
        this.alertService.error(error.statusText);
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.isTrue = false;
  }

}
