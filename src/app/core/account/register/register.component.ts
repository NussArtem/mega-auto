﻿﻿import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AccountService, AlertService} from '../../../shared/services/helpers';

@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['../login/login.component.scss']
})

export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  countryNumber = '+38';
  mobNumberPattern = '^((\\+91-?)|0)?[0-9]{10}$';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phone_number: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
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
    this.form.value.phone_number = this.countryNumber + this.form.value.phone_number;
    this.accountService.register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Registration successful', {keepAfterRouteChange: true});
          this.router.navigate(['../login'], {relativeTo: this.route});
        },
        error: error => {
          this.alertService.error(error.error.detail);
          this.f.errors = error.errors;
          this.loading = false;
          window.location.reload();
        },
      });
  }
}
