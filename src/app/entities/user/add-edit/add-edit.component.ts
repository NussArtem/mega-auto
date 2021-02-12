
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AccountService, AlertService} from '../../../shared/services/helpers';
import {User} from '../../../shared/models';

@Component({
  templateUrl: 'add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})

export class AddEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  user: User;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    this.accountService.user.subscribe(x => this.user = x);
    this.user = this.accountService.userValue;
  }

  ngOnInit() {

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.form = new FormGroup({
      first_name:  new FormControl(this.user.first_name, Validators.required),
      last_name: new FormControl(this.user.last_name, Validators.required),
      username: new FormControl(this.user.username, Validators.required),
      email: new FormControl(this.user.email, Validators.required),
      phone_number: new FormControl(this.user.phone_number, Validators.required),

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
    this.updateUser();
  }


  private updateUser() {
    this.accountService.update(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {

          this.alertService.success('Update successful', {keepAfterRouteChange: true});
          this.router.navigate(['/profile'], {relativeTo: this.route});
        },
        error: error => {
          this.alertService.error(error.error.detail);
          this.loading = false;
        }
      });
  }
}
